import { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminDashboard = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    axios.get('/election')
      .then(res => setElections(res.data))
      .catch(() => alert('Failed to load elections'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-8">
          Admin Dashboard
        </h2>

        {elections.length === 0 ? (
          <p className="text-center text-slate-400">No elections found.</p>
        ) : (
          <div className="space-y-6">
            {elections.map(e => (
              <div
                key={e._id}
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-white">{e.title}</h3>
                <p className="text-slate-300 mb-4">
                  {new Date(e.startDate).toLocaleDateString()} - {new Date(e.endDate).toLocaleDateString()}
                </p>
                <a
                  href={`/election/${e._id}/result`}
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition hover:scale-[1.02]"
                >
                  View Result
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
