"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { set } from 'lodash';

interface JwtPayload {
    sub: string;
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    picture: string;
    name: string;
    iat: number;
    exp: number;
}

interface User {
    id: string;
    email: string;
    family_name: string;
    given_name: string;
    picture: string;
    varified_email: boolean;
    name: string;
}

interface UserContextType {
    user: User | null;
    error: { message: string } | false;
    isLoading: boolean;
    login: (auth_user: { email: string; password: string; }) => Promise<0 | 1>;
    logout: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    error: false,
    isLoading: false,
    login: () => Promise.resolve(0),
    logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<{ message: string } | false>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try{
      setIsLoading(true);
      const token = sessionStorage.getItem('access_token');
      if (token) {
        const decodedUser = jwtDecode<User & JwtPayload>(token);
        setUser(decodedUser);
      }
    } catch (error) {
      setError({ message: 'Failed to authenticate user' });
      console.error('Failed to authenticate user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }

  }, []);


  const login = async (auth_user: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      console.log('user', user);
      if (user) return 0;
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth_user),
      });
      const { access_token } = await response.json();
      sessionStorage.setItem('access_token', access_token);
      const decodedUser = jwtDecode<User & JwtPayload>(access_token);
      setUser(decodedUser);
      return 1;
    } catch (error) {
      setError({ message: 'Failed to login' });
      console.error('Failed to login:', error);
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, error, isLoading, login: login, logout: logout }}>
      {children}
    </UserContext.Provider>
  );
};
