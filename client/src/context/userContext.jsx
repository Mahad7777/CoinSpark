import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

// Create a context for user data
export const UserContext = createContext();

// Provider component to wrap the application
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchUserProfile = async () => {
        try {
            const { data: { userData } } = await axiosInstance.get('/user/getUser');
            console.log('Fetched user data:', userData); // Log the fetched user data
            setUser(userData); // Directly set userData
            setIsAdmin(userData.isadmin);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
    
    

    // useEffect(() => {
    //     fetchUserProfile(); // Fetch user profile on initial render
    // }, []);

    return (
        <UserContext.Provider value={{user, isAdmin,fetchUserProfile}}>
            {children}
        </UserContext.Provider>
    );
};
