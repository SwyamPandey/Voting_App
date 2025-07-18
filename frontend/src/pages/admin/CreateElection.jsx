import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateElection = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/election', form);
      alert('Election created');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Creation failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl w-full max-w-xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
          Create Election
        </h2>

        <div className="space-y-1">
          <label className="text-sm text-slate-300">Election Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Enter title"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-300">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Enter description"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Start Date</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-300">End Date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition hover:scale-[1.02]"
        >
          Create Election
        </button>
      </form>
    </div>
  );
};

export default CreateElection;
