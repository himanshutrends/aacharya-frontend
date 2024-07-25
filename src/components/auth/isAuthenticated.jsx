'use client'
import { useEffect } from 'react';
import { useUser } from '@/context/User';
import { useRouter, usePathname } from "next/navigation";

export const isAuthenticated = (WrappedComponent) => {
    return (props) => {
        const { user, loading, setLoading, setUser, logout } = useUser();
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            (async () => {
                setLoading(true)
                let local_user = localStorage.getItem('user');
                if (local_user) {
                    local_user = JSON.parse(local_user)
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
                } setLoading(false)
            })()
        }, [])

        useEffect(() => {
            if (!loading && !user?.email) {
                router.push(`/auth/login?redirect=${pathname}`);
            }
        }, [loading, router, pathname]);

        return <WrappedComponent {...props} />;
    };
};
