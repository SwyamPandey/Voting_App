import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const VotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);

  useEffect(() => {
    axios.get(`/election/${id}`)
      .then(res => setElection(res.data))
      .catch(() => alert('Failed to load election'));
  }, [id]);

  const handleVote = async (index) => {
    try {
      await axios.post(`/election/${id}/vote/${index}`);
      alert('✅ Vote recorded successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Voting failed');
    }
  };

  if (!election) return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">

        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-6">
          {election.title}
        </h2>

        <h3 className="text-xl font-semibold mb-4 text-slate-300 border-b border-slate-600 pb-2">
          🗳️ Choose a candidate:
        </h3>

        {election.candidates.map((c, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-slate-900/40 border border-slate-700 rounded-lg p-4 mb-3 hover:bg-slate-800 transition duration-200"
          >
            <div>
              <p className="text-lg font-medium text-white">{c.name}</p>
              <p className="text-sm text-slate-400">{c.party}</p>
            </div>
            <button
              onClick={() => handleVote(index)}
              className="py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-transform hover:scale-105"
            >
              Vote
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default VotePage;
