import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const ResultPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`/election/${id}/result`)
      .then(res => setResult(res.data))
      .catch(() => alert('Failed to load result'));
  }, [id]);

  if (!result) return (
    <div className="flex justify-center items-center min-h-screen text-white text-lg">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
        
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-6">
          {result.electionTitle}
        </h2>

        <h3 className="text-xl font-semibold mb-4 text-slate-300 border-b border-slate-600 pb-2">Results:</h3>

        {result.result.map((c, index) => (
          <div
            key={index}
            className="bg-slate-900/40 border border-slate-700 rounded-lg p-4 mb-3 hover:bg-slate-800 transition duration-200"
          >
            <p className="text-lg font-medium text-white">
              {index + 1}. <span className="text-blue-400">{c.name}</span> 
              <span className="text-slate-400"> ({c.party})</span>
            </p>
            <p className="text-sm text-slate-300 mt-1">
              🗳️ Votes: <span className="font-semibold text-purple-400">{c.voteCount}</span>
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ResultPage;
