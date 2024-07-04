"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const UserContext = createContext({
    user: null,
    error: false,
    isLoading: false,
    login: () => Promise.resolve(0),
    logout: () => { },
});
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        try {
            setIsLoading(true);
            const token = sessionStorage.getItem('access_token');
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }
        }
        catch (error) {
            setError({ message: 'Failed to authenticate user' });
            console.error('Failed to authenticate user:', error);
            setUser(null);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const login = async (auth_user) => {
        try {
            setIsLoading(true);
            console.log('user', user);
            if (user)
                return 0;
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(auth_user),
            });
            const { access_token } = await response.json();
            sessionStorage.setItem('access_token', access_token);
            const decodedUser = jwtDecode(access_token);
            setUser(decodedUser);
            return 1;
        }
        catch (error) {
            setError({ message: 'Failed to login' });
            console.error('Failed to login:', error);
            return 0;
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = () => {
        sessionStorage.removeItem('access_token');
        setUser(null);
    };
    return (<UserContext.Provider value={{ user, error, isLoading, login: login, logout: logout }}>
      {children}
    </UserContext.Provider>);
};
