import React, { useEffect, useState } from 'react';
import { candidateAPI } from '../services/api';

function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [candidateData, setCandidateData] = useState({
    name: '',
    party: '',
    age: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await candidateAPI.getCandidates();
      setCandidates(response.data);
    } catch (error) {
      console.error('Failed to fetch candidates', error);
    }
  };

  const handleChange = (e) => {
    setCandidateData({
      ...candidateData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      await candidateAPI.addCandidate(candidateData);
      fetchCandidates();
      setCandidateData({ name: '', party: '', age: '' });
    } catch (error) {
      setError('Failed to add candidate');
    }
  };

  const handleDelete = async (id) => {
    try {
      await candidateAPI.deleteCandidate(id);
      fetchCandidates();
    } catch (error) {
      console.error('Failed to delete candidate', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleAddCandidate} className="add-candidate-form">
        <h3>Add a Candidate</h3>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={candidateData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="party"
          placeholder="Party Name"
          value={candidateData.party}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={candidateData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Candidate</button>
      </form>

      <div className="candidate-list">
        <h3>Candidate List</h3>
        <ul>
          {candidates.map(candidate => (
            <li key={candidate._id}>
              <span>{candidate.name} - {candidate.party}</span>
              <button onClick={() => handleDelete(candidate._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;

