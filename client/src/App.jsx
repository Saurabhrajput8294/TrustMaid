import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SearchMaids from './pages/SearchMaids';
import MaidProfile from './pages/MaidProfile';
import BookingPage from './pages/BookingPage';
import BookingHistory from './pages/BookingHistory';
import Profile from './pages/Profile';
import MaidDashboard from './pages/MaidDashboard';
import BookingRequests from './pages/BookingRequests';
import WorkSchedule from './pages/WorkSchedule';
import AdminDashboard from './pages/AdminDashboard';
import ManageMaids from './pages/ManageMaids';
import ManageUsers from './pages/ManageUsers';
import ManageBookings from './pages/ManageBookings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search-maids" element={<SearchMaids />} />
            <Route path="/maid/:maidId" element={<MaidProfile />} />
            <Route path="/book/:maidId" element={<BookingPage />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/maid-dashboard" element={<MaidDashboard />} />
            <Route path="/booking-requests" element={<BookingRequests />} />
            <Route path="/work-schedule" element={<WorkSchedule />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manage-maids" element={<ManageMaids />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;