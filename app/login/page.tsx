"use client"

import { AuthProvider, useAuth } from "@/components/AuthContext";
import { fail } from "assert";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const { isLoggedIn, login } = useAuth()!;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failure, setFailure] = useState(false);

    if (isLoggedIn) {
        redirect("/")
    }

    const handleLogin = (e: any) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            redirect("/")
        } else {
            setFailure(true);
        }
    }

    return (
        <AuthProvider>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Log In</h1>
                        <p className="py-6 font-semibold text-lg">Enter Your Hacker Details</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onChange={(e) => { setEmail(e.target.value), setFailure(false) }} type="email" placeholder="test@hackthenorth.com" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input onChange={(e) => { setPassword(e.target.value), setFailure(false) }} type="password" placeholder="test" className="input input-bordered" required />
                            </div>
                            {failure ? (
                                <div role="alert" className="alert alert-error mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Invalid Credentials</span>
                                </div>
                            ) : (
                               '' 
                            )}
                            <div className="form-control mt-6">
                                <button onClick={handleLogin} className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthProvider>
    )
}