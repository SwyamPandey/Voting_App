import React, { useEffect, useState } from 'react';
import { candidateAPI } from '../services/api';

function VoteResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await candidateAPI.getVoteCount();
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch vote results');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading results...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Calculate total votes
  const totalVotes = results.reduce((sum, result) => sum + result.count, 0);

  return (
    <div className="vote-results">
      <h2>Vote Results</h2>
      
      <div className="results-summary">
        <p><strong>Total Votes Cast:</strong> {totalVotes}</p>
      </div>

      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <div className="result-info">
              <h3>{result.party}</h3>
              <div className="vote-count">
                <span className="votes">{result.count} votes</span>
                <span className="percentage">
                  ({totalVotes > 0 ? ((result.count / totalVotes) * 100).toFixed(1) : 0}%)
                </span>
              </div>
            </div>
            <div className="result-bar">
              <div 
                className="progress-bar"
                style={{ 
                  width: `${totalVotes > 0 ? (result.count / totalVotes) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="no-results">
          <p>No votes have been cast yet.</p>
        </div>
      )}
    </div>
  );
}

export default VoteResults;
