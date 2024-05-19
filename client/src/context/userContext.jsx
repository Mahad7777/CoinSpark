import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for user data
export const UserContext = createContext();

// Provider component to wrap the application
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setisAdmin] = useState(false)

    // const fetchUserProfile = async () => {
    //     try {
    //         const { data } = await axios.get('/user/getUser');
    //         setUser(data);
    //     } catch (error) {
    //         console.error('Error fetching user profile:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserProfile(); // Fetch user profile on initial render
    // }, []);

    return (
        <UserContext.Provider value={{setUser, isAdmin, setisAdmin}}>
            {children}
        </UserContext.Provider>
    );
};
