import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [elections, setElections] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/election")
            .then((res) => setElections(res.data))
            .catch(() => alert("Failed to load elections"));
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this election?"
        );
        if (!confirmDelete) return;

        try {
            const candidateIndex = user._id;
            console.log(candidateIndex);
            await axios.delete(`/election/delete/${id}`);
            // alert("Election deleted");
            toast.success("Election deleted! Please refresh the page once");
        } catch (err) {
            console.error(err);
            // alert(err.response?.data?.message || "Failed to delete candidate");
            toast.error(err.response?.data?.message || "Failed to delete candidate");
        }
    };

    return (
        <>
        <Toaster position="top-right"/>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-8">
                        Admin Dashboard
                    </h2>

                    {elections.length === 0 ? (
                        <p className="text-center text-slate-400">
                            No elections found.
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {elections.map((e) => (
                                <div
                                    key={e._id}
                                    className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 shadow-lg"
                                >
                                    <h3 className="text-2xl font-semibold text-white">
                                        {e.title}
                                    </h3>
                                    <p className="text-slate-300 mb-4">
                                        {new Date(
                                            e.startDate
                                        ).toLocaleDateString()}{" "}
                                        -{" "}
                                        {new Date(
                                            e.endDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <a
                                        href={`/election/${e._id}/result`}
                                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition hover:scale-[1.02]"
                                    >
                                        View Result
                                    </a>

                                    <button
                                            onClick={() => navigate(`/admin/election/${e._id}/candidate/new`)}
                                            className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-teal-500 px-4 py-2 rounded-lg ml-4 text-white cursor-pointer"
                                        >
                                            Add Candidate
                                        </button>

                                    {user?.role === "admin" && (
                                        <button
                                            onClick={() => handleDelete(e._id)}
                                            className="text-sm font-semibold bg-red-500 px-4 py-2 rounded-lg ml-4 text-white cursor-pointer hover:bg-red-400"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
