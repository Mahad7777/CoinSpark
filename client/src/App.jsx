import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar, SubmitRequest } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, Signup, Login, AdminDashboard, CampaignRequests } from './pages';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { PublicLayout, MainLayout, AdminLayout } from './utils/layoutcontrol';
import { UserProvider } from './context/userContext';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; 
const App = () => {
  return (
      <div className="relative p-4 bg-[#13131a] min-h-screen">
        <Toaster position='top-center' toastOptions={{ duration: 2000 }} />
      <UserProvider>
        <Routes>
          {/* Routes without Sidebar and Navbar */}
          <Route element={<PublicLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Routes with Sidebar and Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/submit-request" element={<SubmitRequest />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/campaign-requests" element={<CampaignRequests />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
          </Route>
        </Routes>
        </UserProvider>
      </div>
  );
};

export default App