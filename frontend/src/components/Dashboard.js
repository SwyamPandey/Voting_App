import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name}!</h2>
      <div className="dashboard-content">
        <div className="user-info">
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Voting Status:</strong> {user?.isVoted ? 'Voted' : 'Not Voted'}</p>
        </div>
        
        <div className="dashboard-actions">
          <Link to="/profile" className="action-link">
            <button className="action-btn">View Profile</button>
          </Link>
          
          {!user?.isVoted && (
            <Link to="/vote" className="action-link">
              <button className="action-btn vote-btn">Cast Your Vote</button>
            </Link>
          )}
          
          <Link to="/results" className="action-link">
            <button className="action-btn">View Results</button>
          </Link>
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="action-link">
              <button className="action-btn admin-btn">Admin Panel</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

