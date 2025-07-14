import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header">
      <h1>Voting App</h1>
      <nav>
        <Link to="/dashboard">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        <Link to="/vote">Vote</Link>
        <Link to="/results">Results</Link>
      </nav>
    </header>
  );
}

export default Header;

