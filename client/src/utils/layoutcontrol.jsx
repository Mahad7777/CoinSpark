import React, {useState, useEffect, useContext} from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import {UserContext} from '../context/userContext'

export const MainLayout = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
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
    const {isAdmin} = useContext(UserContext)

    return isAdmin ? (
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
            </div>
            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                {/* <Navbar /> */}
                <Outlet />
            </div>
        </div>
    ) : <Navigate to={'/'}/>
};  
