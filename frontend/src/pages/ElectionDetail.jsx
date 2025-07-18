import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../auth/AuthContext';

const ElectionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [election, setElection] = useState(null);

  const fetchElection = async () => {
    try {
      const res = await axios.get(`/election/${id}`);
      setElection(res.data);
    } catch {
      alert('Failed to load election');
    }
  };

  useEffect(() => {
    fetchElection();
  }, [id]);

  const handleDelete = async (candidateIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/election/${id}/candidate/${candidateIndex}`);
      alert('Candidate deleted');
      fetchElection(); // Refresh the candidate list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete candidate');
    }
  };

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">

        {/* Title */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text text-center mb-4">
          {election.title}
        </h2>

        {/* Description */}
        <p className="text-slate-300 mb-6 text-center">{election.description}</p>

        {/* Candidates */}
        <h3 className="text-xl font-semibold text-slate-300 mb-3 border-b border-slate-600 pb-2">
          🧑‍🤝‍🧑 Candidates
        </h3>

        <div className="space-y-4 mb-6">
          {election.candidates.map((c, index) => (
            <div
              key={index}
              className="bg-slate-900/40 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-white">👤 {c.name}</p>
                  <p className="text-sm text-slate-400">🏛️ {c.party}</p>
                </div>

                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-400 text-sm font-semibold"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to={`/election/${id}/vote`}
            className="w-full sm:w-auto py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg text-center transition-transform hover:scale-105"
          >
            Cast Your Vote
          </Link>

          <Link
            to={`/election/${id}/result`}
            className="w-full sm:w-auto py-2 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg text-center transition-transform hover:scale-105"
          >
            View Results
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ElectionDetail;
