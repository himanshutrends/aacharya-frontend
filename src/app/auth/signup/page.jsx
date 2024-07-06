"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/User";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [auth_user, setUser] = useState({ first_name: "", last_name: "", email: "", password: "" });
    const { signup, loading, setLoading, error, setError } = useUser();
    const router = useRouter();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!auth_user.email || !auth_user.password || !auth_user.first_name || !auth_user.last_name) {
            setError({ message: "All fields are required", status: true });
            return;
        }
        signup(auth_user)
        router.push('/')
    };
    
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/login/google`;
        }
        catch (error) {
            console.error(error);
            setError({ message: "An error occurred", status: true });
        }
        finally {
            setLoading(false);
        }
    };
    return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" name="first_name" value={auth_user.first_name} onChange={handleChange} placeholder="Max" required/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" name="last_name" value={auth_user.last_name} onChange={handleChange} placeholder="Robinson" required/>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" value={auth_user.email} onChange={handleChange} placeholder="m@example.com" required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" value={auth_user.password} onChange={handleChange} type="password"/>
          </div>
          {loading ? <Button className="w-full">Loading...</Button> : <Button type="submit" className="w-full">
            Create an account
          </Button>}
          {loading ? <Button className="w-full">Loading...</Button> :
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              Sign up with Google
            </Button>}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link href='/auth/login' className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>);
}
