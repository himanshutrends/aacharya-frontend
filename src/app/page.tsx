// pages/index.js
'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    
    return (
      <div className='basiccenter'>
        <Link href="/api/auth/logout">Logout</Link>
      </div>
    );
  }

  return(
  <div className='basiccenter'>
  <Link href="/api/auth/login"><button className='basicbutton'>Login</button></Link>
</div>);
}