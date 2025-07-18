import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const ElectionList = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    axios.get('/election')
      .then(res => setElections(res.data))
      .catch(() => alert('Failed to load elections'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Available Elections</h2>

        {elections.length === 0 ? (
          <p className="text-slate-400">No elections available currently.</p>
        ) : (
          <div className="space-y-6">
            {elections.map(e => (
              <div key={e._id} className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 hover:shadow-lg transition duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{e.title}</h3>
                  <Link
                    to={`/election/${e._id}`}
                    className="text-blue-400 hover:underline text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
                <p className="text-slate-400 text-sm">
                  <span className="font-medium text-slate-300">Start:</span> {new Date(e.startDate).toLocaleDateString()} &nbsp;|&nbsp;
                  <span className="font-medium text-slate-300">End:</span> {new Date(e.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionList;
