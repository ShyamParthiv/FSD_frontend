import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ContributorDashboard from './pages/ContributorDashboard';
import CreateSubmission from './pages/CreateSubmission';
import SubmissionDetails from './pages/SubmissionDetails';
import ResubmitSubmission from './pages/ResubmitSubmission';
import ReviewerDashboard from './pages/ReviewerDashboard';
import ReviewSubmission from './pages/ReviewSubmission';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Contributor Routes */}
      <Route path="/dashboard/contributor" element={
        <ProtectedRoute role="contributor"><ContributorDashboard /></ProtectedRoute>
      } />
      <Route path="/submissions/new" element={
        <ProtectedRoute role="contributor"><CreateSubmission /></ProtectedRoute>
      } />
      <Route path="/submissions/:id/resubmit" element={
        <ProtectedRoute role="contributor"><ResubmitSubmission /></ProtectedRoute>
      } />

      {/* Reviewer Routes */}
      <Route path="/dashboard/reviewer" element={
        <ProtectedRoute role="reviewer"><ReviewerDashboard /></ProtectedRoute>
      } />
      <Route path="/submissions/:id/review" element={
        <ProtectedRoute role="reviewer"><ReviewSubmission /></ProtectedRoute>
      } />

      {/* Shared/View Routes */}
      <Route path="/submissions/:id" element={
        <ProtectedRoute><SubmissionDetails /></ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
