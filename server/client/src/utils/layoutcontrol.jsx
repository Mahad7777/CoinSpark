import React, {useState, useEffect, useContext} from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Sidebar } from '../components';
import Navbar from '../components/Navbar';
import { Outlet, useNavigate, Navigate, Link } from 'react-router-dom';
import {UserContext} from '../context/userContext'


export const MainLayout = () => {
  const {user, isAdmin, fetchUserProfile} = useContext(UserContext)
  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on initial render
  }, []);

  if (!user) {
  // If user is undefined, return a loading spinner or nothing until the data is fetched
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="text-center">
        <p>Token expired...</p>
        <Link to="/login" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Login
        </Link>
      </div>
    </div>
  );
}


  return user? (
    <div className="relative sm:-8 p-4 bg-gradient-to-br from-black via-gray-900 to-blue-900 min-h-screen flex flex-row">
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
      // <div className="flex items-center justify-center min-h-screen">
      //   <div className="relative p-4 w-full max-w-lg">
          <Outlet />
      //   {/* </div>
      // </div> */}
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
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
          <div className="text-center">
            <p>Token expired...</p>
            <Link to="/login" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to Login
            </Link>
          </div>
        </div>
      );
    }
  
    const userData = user.userData;
  
    return isAdmin ? (
      <div className="relative sm:-8 p-4 bg-gradient-to-br from-black via-gray-900 to-blue-900 min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <AdminSidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Outlet />
      </div>
    </div>
    ) : (
      <Navigate to="/" />
    );
  };
