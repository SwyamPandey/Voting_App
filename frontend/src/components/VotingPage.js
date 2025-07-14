import React, { useEffect, useState } from 'react';
import { candidateAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function VotingPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await candidateAPI.getCandidates();
      setCandidates(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch candidates');
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      await candidateAPI.vote(candidateId);
      setMessage('Vote cast successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cast vote');
    }
  };

  if (loading) {
    return <div>Loading candidates...</div>;
  }

  if (user?.isVoted) {
    return (
      <div className="voting-page">
        <h2>Voting</h2>
        <div className="already-voted">
          <p>You have already cast your vote. Thank you for participating!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="voting-page">
      <h2>Cast Your Vote</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      
      <div className="candidates-list">
        {candidates.map(candidate => (
          <div key={candidate._id} className="candidate-card">
            <h3>{candidate.name}</h3>
            <p>Party: {candidate.party}</p>
            <button 
              onClick={() => handleVote(candidate._id)}
              className="vote-btn"
            >
              Vote for {candidate.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotingPage;
