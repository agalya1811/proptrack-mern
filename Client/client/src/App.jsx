import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AgentDashboardLayout from './components/AgentDashboardLayout';
import DashboardPage from './pages/DashboardPage';
import PropertyList from './components/PropertyList';
import InquiryList from './components/InquiryList';
import ViewingSchedule from './components/ViewingSchedule';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />

          {/* Agent Dashboard */}
      <Route path="/dashboard" element={<AgentDashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="properties" element={<PropertyList />} />
        <Route path="inquiries" element={<InquiryList />} />
        <Route path="viewings" element={<ViewingSchedule />} />
      </Route>
    </Routes>
  );
}

export default App;