"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

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
    login: (token: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    error: false,
    isLoading: false,
    login: () => {},
    logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedUser = jwtDecode<User & JwtPayload>(token);
      setUser(decodedUser);
    }
  }, []);

  const login = (token: string) => {
    sessionStorage.setItem('access_token', token);
    const decodedUser = jwtDecode<User & JwtPayload>(token);
    console.log(decodedUser);
    setUser(decodedUser);
  };

  const logout = () => {
    sessionStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, error: false, isLoading: false, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
