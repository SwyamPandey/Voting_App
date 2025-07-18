const express = require("express");
const router = express.Router();
const Election = require("../models/election");
const User = require("../models/user");
const { jwtAuthMiddleware } = require("../jwt");

// Helper: Check admin
const checkAdmin = async (id) => {
    const user = await User.findById(id);
    return user && user.role === "admin";
};

// 1. Create new election (admin only)
router.post("/", jwtAuthMiddleware, async (req, res) => {
    if (!(await checkAdmin(req.user.id)))
        return res
            .status(403)
            .json({ message: "Only admin can create election" });

    const election = new Election(req.body);
    await election.save();
    res.status(201).json(election);
});

// 2. Add candidate to election
router.post("/:id/candidate", jwtAuthMiddleware, async (req, res) => {
    if (!(await checkAdmin(req.user.id)))
        return res
            .status(403)
            .json({ message: "Only admin can add candidate" });

    const election = await Election.findById(req.params.id);
    if (!election)
        return res.status(404).json({ message: "Election not found" });

    election.candidates.push(req.body);
    await election.save();
    res.json(election);
});

// 3. Vote in election
router.post(
    "/:id/vote/:candidateIndex",
    jwtAuthMiddleware,
    async (req, res) => {
        try {
            const election = await Election.findById(req.params.id);
            if (!election)
                return res.status(404).json({ message: "Election not found" });

            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(404).json({ message: "User not found" });

            if (user.role === "admin")
                return res
                    .status(403)
                    .json({ message: "Admins are not allowed to vote" });

            if (
                user.votedElections &&
                user.votedElections.includes(election._id)
            ) {
                return res
                    .status(400)
                    .json({ message: "Already voted in this election" });
            }

            const candidate = election.candidates[req.params.candidateIndex];
            if (!candidate)
                return res.status(404).json({ message: "Candidate not found" });

            // Record vote
            candidate.votes.push({ user: user._id });
            candidate.voteCount += 1;
            user.votedElections.push(election._id);

            await election.save();
            await user.save();

            return res.status(200).json({ message: "Vote recorded" });
        } catch (err) {
            console.error("Vote error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// 4. Get elections list
router.get("/", async (req, res) => {
    const elections = await Election.find({}, "title startDate endDate");
    res.json(elections);
});

//update an candidate
router.put(
    "/:electionId/candidate/:candidateIndex",
    jwtAuthMiddleware,
    async (req, res) => {
        try {
            const { electionId, candidateIndex } = req.params;
            const updateData = req.body;

            // Check admin
            const user = await User.findById(req.user.id);
            if (!user || user.role !== "admin") {
                return res
                    .status(403)
                    .json({ message: "Only admin can update candidates" });
            }

            const election = await Election.findById(electionId);
            if (!election) {
                return res.status(404).json({ message: "Election not found" });
            }

            const candidate = election.candidates[candidateIndex];
            if (!candidate) {
                return res.status(404).json({ message: "Candidate not found" });
            }

            // Update candidate fields
            candidate.name = updateData.name || candidate.name;
            candidate.party = updateData.party || candidate.party;
            candidate.age = updateData.age || candidate.age;

            await election.save();
            res.status(200).json({ message: "Candidate updated", candidate });
        } catch (err) {
            console.error("Update error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

//delete an candidate
router.delete(
    "/:electionId/candidate/:candidateIndex",
    jwtAuthMiddleware,
    async (req, res) => {
        try {
            const { electionId, candidateIndex } = req.params;

            const user = await User.findById(req.user.id);
            if (!user || user.role !== "admin") {
                return res
                    .status(403)
                    .json({ message: "Only admin can delete candidates" });
            }

            const election = await Election.findById(electionId);
            if (!election) {
                return res.status(404).json({ message: "Election not found" });
            }

            if (!election.candidates[candidateIndex]) {
                return res.status(404).json({ message: "Candidate not found" });
            }

            election.candidates.splice(candidateIndex, 1);
            await election.save();

            res.status(200).json({ message: "Candidate deleted" });
        } catch (err) {
            console.error("Delete error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// Get full details of one election with candidates
router.get("/:electionId", async (req, res) => {
    try {
        const election = await Election.findById(req.params.electionId);

        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        res.status(200).json(election);
    } catch (err) {
        console.error("Get Election by ID error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📊 Election Result - Sorted by voteCount descending
router.get("/:id/result", async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);

        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        // 🔽 Sort candidates by voteCount DESCENDING
        const sortedCandidates = [...election.candidates]
            .map((c) => ({
                name: c.name,
                party: c.party,
                voteCount: c.voteCount,
            }))
            .sort((a, b) => b.voteCount - a.voteCount); // 🔥 Main step

        res.status(200).json({
            electionTitle: election.title,
            totalCandidates: sortedCandidates.length,
            result: sortedCandidates,
        });
    } catch (err) {
        console.error("Result route error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/delete/:id", jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (user.role != "admin") {
            res.status(400).json({
                message: "Only admins are allowed to delete the election",
            });
        }

        await Election.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "Election deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Something went wrong",
        });
    }
});

module.exports = router;
