import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AgentDashboardLayout from './components/AgentDashboardLayout';
import DashboardPage from './pages/DashboardPage';
import PropertyList from './components/PropertyList';
import InquiryList from './components/InquiryList';
import ViewingSchedule from './components/ViewingSchedule';
import PropertyDetails from './pages/PropertyDetailPage';
import ClientListPage from './pages/ClientListPage';
//import AddClientPage from './pages/AddClientPage';

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
      <Route path="/dashboard/clients" element={<ClientListPage />} />

<Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
}

export default App;