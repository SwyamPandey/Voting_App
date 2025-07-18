import { useAuth } from '../auth/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6">User Profile</h2>

        <div className="space-y-4 text-slate-300">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {user?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">
                {user?.fullName || 'Unnamed User'}
              </h3>
              <p className="capitalize text-slate-400 text-sm">{user.role === 'user' ? 'voter': user.role}</p>
            </div>
          </div>

          <div className="border-t border-slate-700 my-4"></div>

          <p><span className="text-slate-400 font-medium">📍 Address:</span> {user?.address || 'N/A'}</p>
          <p><span className="text-slate-400 font-medium">🆔 Aadhar:</span> {user?.aadharNumber || 'N/A'}</p>
          <p><span className="text-slate-400 font-medium">🎂 Age:</span> {user?.age || 'N/A'}</p>
          <p><span className="text-slate-400 font-medium">🛡️ Role:</span> {user.role === 'user' ? 'voter': user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
