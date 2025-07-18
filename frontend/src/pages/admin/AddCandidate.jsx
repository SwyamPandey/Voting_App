import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api/axios';
import toast, { Toaster } from 'react-hot-toast';

const AddCandidate = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', party: '', age: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/election/${electionId}/candidate`, form);
      // alert('Candidate added');
      toast.success('Candidate added successfully!')
      navigate(`/admin/dashboard`);
    } catch (err) {
      // alert(err.response?.data?.error || 'Failed to add candidate');
      toast.error(err.response?.data?.error || 'Failed to add candidate');
    }
  };

  return (
    <>
    <Toaster position="top-right" />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-6">
          Add Candidate
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Candidate Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="party"
            placeholder="Party"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition hover:scale-[1.02]"
        >
          Add Candidate
        </button>
      </form>
    </div>
    </>
  );
};

export default AddCandidate;
