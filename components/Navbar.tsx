"use client"

import localFont from 'next/font/local';
import { useAuth } from './AuthContext';
import Link from 'next/link';
const honk = localFont({ src: 'Honk-Regular-VariableFont_MORF,SHLN.ttf' });

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth()!;

    const handleSignout = () => {
        logout()
    }

    return (
        <div className="navbar rounded shadow-2xl max-w-6xl">
            <div className="navbar-start">
                <div className="avatar flex-1">
                    <div className="w-10">
                        <img src="htn.png" />
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <h1 className={`hidden sm:flex ${honk.className}`} style={{ fontSize: '2.5rem' }}>Hack The North</h1>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                {isLoggedIn ? (
                    <button onClick={handleSignout} className="btn btn-ghost">
                        Sign Out
                    </button>
                ) : (
                    <button className="btn btn-ghost">
                        <Link href="/login">
                            Log In
                        </Link>
                    </button>
                )}
            </div>
        </div>
    )
}