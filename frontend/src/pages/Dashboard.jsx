import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const mockStats = {
    totalElections: 5,
    activeElections: 2,
    completedVotes: 3,
    pendingVotes: 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.fullName || user?.name || 'User'}!
              </h1>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${user?.role === 'admin' ? 'bg-emerald-400' : 'bg-blue-400'}`}></div>
                  <span className="text-slate-300 capitalize">{user?.role || 'Voter'}</span>
                </div>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {user?.fullName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Elections */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">{mockStats.totalElections}</span>
            </div>
            <h3 className="text-slate-300 font-medium">Total Elections</h3>
            <p className="text-slate-400 text-sm mt-1">All available elections</p>
          </div>

          {/* Active Elections */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">{mockStats.activeElections}</span>
            </div>
            <h3 className="text-slate-300 font-medium">Active Elections</h3>
            <p className="text-slate-400 text-sm mt-1">Currently ongoing</p>
          </div>

          {/* Completed Votes */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">{mockStats.completedVotes}</span>
            </div>
            <h3 className="text-slate-300 font-medium">Completed Votes</h3>
            <p className="text-slate-400 text-sm mt-1">Successfully cast</p>
          </div>

          {/* Pending Votes */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">{mockStats.pendingVotes}</span>
            </div>
            <h3 className="text-slate-300 font-medium">Pending Votes</h3>
            <p className="text-slate-400 text-sm mt-1">Awaiting your vote</p>
          </div>
        </div>

        {/* Quick Actions + Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Link to="/elections" className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors duration-200">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">View Elections</h3>
                      <p className="text-slate-400 text-sm">Browse all available elections</p>
                    </div>
                  </div>
                </Link>

                {user?.role === 'admin' && (
                  <Link to="/admin/election/new" className="w-full p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-200 group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-500/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors duration-200">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Create Election</h3>
                        <p className="text-slate-400 text-sm">Set up a new election</p>
                      </div>
                    </div>
                  </Link>
                )}

                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="w-full p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center group-hover:bg-purple-500/40 transition-colors duration-200">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Admin Dashboard</h3>
                        <p className="text-slate-400 text-sm">Manage all elections</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Profile Section */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.fullName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user?.fullName || user?.name || 'User'}</h3>
                    <p className="text-slate-400 text-sm capitalize">{user?.role || 'Voter'}</p>
                  </div>
                </div>
                <Link to="/profile" className="w-full mt-4 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all duration-200 text-center block">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
