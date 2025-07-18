// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ElectionList from './pages/ElectionList';
import ElectionDetail from './pages/ElectionDetail';
import VotePage from './pages/VotePage';
import ResultPage from './pages/ResultPage';
import Profile from './pages/Profile';
import UpdatePassword from './pages/UpdatePassword';
import CreateElection from './pages/admin/CreateElection';
import AddCandidate from './pages/admin/AddCandidate';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
       
  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/elections" element={<ProtectedRoute><ElectionList /></ProtectedRoute>} />
  <Route path="/election/:id" element={<ProtectedRoute><ElectionDetail /></ProtectedRoute>} />
  <Route path="/election/:id/vote" element={<ProtectedRoute><VotePage /></ProtectedRoute>} />
  <Route path="/election/:id/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />

  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  <Route path="/profile/password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />

  <Route path="/admin/election/new" element={<ProtectedRoute adminOnly={true}><CreateElection /></ProtectedRoute>} />
  <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
  <Route path="/admin/election/:electionId/candidate/new" element={<ProtectedRoute adminOnly={true}><AddCandidate /></ProtectedRoute>} />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
