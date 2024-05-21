import React, {useState, useEffect, useContext} from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Sidebar } from '../components';
import Navbar from '../components/Navbar';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import {UserContext} from '../context/userContext'

export const MainLayout = () => {
  const {user, isAdmin, fetchUserProfile} = useContext(UserContext)
  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on initial render
  }, []);

  if (!user) {
    // If user is undefined, return a loading spinner or nothing until the data is fetched
    return <div className="text-white">Token expired.. </div>;
  }

  return user? (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to='/login'/>
  )
};

export const PublicLayout = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#13131a]">
        <div className="relative p-4 w-full max-w-lg">
          <Outlet />
        </div>
      </div>
    );
  };
  

  export const AdminLayout = () => {
    const { isAdmin, user, fetchUserProfile } = useContext(UserContext);
    useEffect(() => {
      fetchUserProfile(); // Fetch user profile on initial render
    }, []);

  
    // Check if the user object exists before accessing userData
    if (!user) {
      // If user is undefined, return a loading spinner or nothing until the data is fetched
      return <div className="text-white">Token expired.. </div>;
    }
  
    const userData = user.userData;
  
    return isAdmin ? (
      <div className="relative sm:-8 p-4 bg-\[#13131a\] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <AdminSidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-\[1280px\] mx-auto sm:pr-5">
          <Outlet />
          <h1>{userData.name}</h1>
        </div>
      </div>
    ) : (
      <Navigate to="/" />
    );
  };
