'use client'
import { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    user: {},
    error: {},
    setError: () => { },
    loading: true,
    setLoading: () => { },
    login: () => { },
    signup: () => { },
    logout: () => { },
})

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState({
        message: "",
        status: false
    });

    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem('user');
        setUser({});
    }

    useEffect(() => {
        (async() => {setLoading(true)
        let local_user = localStorage.getItem('user');
        if (local_user) {
            local_user = JSON.parse(local_user)
            console.log(local_user)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}auth/is_authenticated`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + local_user.access_token
                }
            })
            if (response.status == 401) {
                logout()
            } else {
                console.log(local_user)
                setUser(local_user)
            }
        } setLoading(false)})()
    }, [])


    const login = async (auth_user) => {
        setLoading(true);
        try{
            const { email, password, rememberMe } = auth_user;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, rememberMe })
            })
            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(data.msg);
            }
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
        } catch (error) {
            if (error.message){
                setError(
                    {
                        message: error.message,
                        status: true
                    }
                )
            }
            else {
                setError(
                    {
                        message: "Something went wrong, please try again later.",
                        status: true
                    }
                )
            }
        } finally {
            setLoading(false)
        }
    }

    const signup = async (auth_user) => {
        setLoading(true);
        try{
            const { email, password, first_name, last_name } = auth_user;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password , first_name, last_name })
            })
            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(data.msg);
            }
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
        } catch (error) {
            if (error.message){
                setError(
                    {
                        message: error.message,
                        status: true
                    }
                )
            }
            else {
                setError(
                    {
                        message: "Something went wrong, please try again later.",
                        status: true
                    }
                )
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            error,
            setError,
            loading,
            setLoading,
            login,
            signup,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}
