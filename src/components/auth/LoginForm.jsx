"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from "@/context/User";

export default function LoginForm() {
    const [user, setUser] = useState({ email: "", password: "" })
    const { login, loading, setLoading, error } = useUser()
    const router = useRouter()
    const params = useSearchParams()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async () => {
      if (!user.email || !user.password) {
          alert("Email and password are required");
      }
      login(user)
      if(!loading && !error.status){
        const redirect = params.get("redirect")
        if(redirect) {
          console.log(redirect, params)
          router.push(redirect)
        } else {
          router.push("/")
        }
      }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/login/google`;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="m@example.com" value={user.email} onChange={handleChange} required/>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" name="password" value={user.password} onChange={handleChange} required/>
          </div>
          <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
            {loading ? "Redirecting..." : "Login with Google"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>);
}
