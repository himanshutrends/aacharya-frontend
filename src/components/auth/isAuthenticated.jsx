'use client'
import { useEffect } from 'react';
import { useUser } from '@/context/User';
import { useRouter } from "next/navigation";

const isAuthenticated = (WrappedComponent) => {
    return (props) => {
        const { user, loading, logout } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user?.email) {
                router.push('/auth/login');
            }
        }, [loading, router]);

        return <WrappedComponent {...props} />;
    };
};

export default isAuthenticated;
