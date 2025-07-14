const express=require('express');
const router=express.Router();
const Candidate=require('../models/candidate');
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const User=require('../models/user');

const checkAdminRole = async (userID) => {
    try{
         const user = await User.findById(userID);
         if(user.role === 'admin'){
             return true;
         }
    }catch(err){
         return false;
    }
 }
 
 // POST route to add a candidate
 router.post('/', jwtAuthMiddleware, async (req, res) =>{
     try{
         if(!(await checkAdminRole(req.user.id)))
             return res.status(403).json({message: 'user does not have admin role'});
 
         const data = req.body // Assuming the request body contains the candidate data
 
         // Create a new User document using the Mongoose model
         const newCandidate = new Candidate(data);
 
         // Save the new user to the database
         const response = await newCandidate.save();
         console.log('data saved');
         res.status(200).json({response: response});
     }
     catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal Server Error'});
     }
 })
 
 router.put('/:candidateID', jwtAuthMiddleware, async (req, res)=>{
     try{
         if(!checkAdminRole(req.user.id))
             return res.status(403).json({message: 'user does not have admin role'});
         
         const candidateID = req.params.candidateID; // Extract the id from the URL parameter
         const updatedCandidateData = req.body; // Updated data for the person
 
         const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
             new: true, // Return the updated document
             runValidators: true, // Run Mongoose validation
         })
 
         if (!response) {
             return res.status(404).json({ error: 'Candidate not found' });
         }
 
         console.log('candidate data updated'); 
         res.status(200).json(response);
     }catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal Server Error'});
     }
 })
 
 router.delete('/:candidateID', jwtAuthMiddleware, async (req, res)=>{
     try{
         if(!checkAdminRole(req.user.id))
             return res.status(403).json({message: 'user does not have admin role'});
         
         const candidateID = req.params.candidateID; // Extract the id from the URL parameter
 
         const response = await Candidate.findByIdAndDelete(candidateID);
 
         if (!response) {
             return res.status(404).json({ error: 'Candidate not found' });
         }
 
         console.log('candidate deleted');
         res.status(200).json(response);
     }catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal Server Error'});
     }
 })
 
 router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
    // Only non-admin users can vote, and only once
    console.log("yaha tak aya hae age eror dekho ----------");

    const candidateID = req.params.candidateID;
    console.log(candidateID);
    const userId = req.user.id;
    console.log(userId);

    // Validate candidateID format (assuming MongoDB ObjectId)
    if (!candidateID.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid candidate ID format' });
    }

    try {
        // Find the Candidate document with the specified candidateID
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Admins are not allowed to vote' });
        }
        if (user.isVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Record the vote
        candidate.votes.push({ user: userId });
        candidate.voteCount = (candidate.voteCount || 0) + 1;
        await candidate.save();

        // Update the user document
        user.isVoted = true;
        await user.save();

        return res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.error('Vote error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
 // vote count 
 router.get('/vote/count', async (req, res) => {
     try{
         // Find all candidates and sort them by voteCount in descending order
         const candidate = await Candidate.find().sort({voteCount: 'desc'});

         // Map the candidates to only return their name and voteCount
         const voteRecord = candidate.map((data)=>{
             return {
                 party: data.party,
                 count: data.voteCount
             }
         });

         return res.status(200).json(voteRecord);
     }catch(err){
         console.error("Error in /vote/count route:", err); // More detailed error
         res.status(500).json({error: 'Internal Server Error', details: err.message});
     }
 });
 
 // Get List of all candidates with only name and party fields
 router.get('/', async (req, res) => {
     try {
         // Find all candidates and select only the name and party fields, excluding _id
         const candidates = await Candidate.find({}, 'name party _id');
 
         // Return the list of candidates
         res.status(200).json(candidates);
     } catch (err) {
         console.error(err);
         res.status(500).json({ error: 'Internal Server Error' });
     }
 });
 
 module.exports = router;
