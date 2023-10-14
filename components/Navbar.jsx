"use client";

import Image from "next/image"
import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { useState } from 'react';


export default function Navbar({user}) {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    return (
        <nav className="flex justify-between items-center py-3 max-sm:px-5 px-10 shadow-lg bg-gray-100">
            <Link href="/" className="text-3xl flex items-center gap-2">
                <Image
                    src="/logo.png"
                    height={50}
                    width={50}
                    alt="book store logo"
                    className=""
                />
                <h1 className="max-md:hidden"><span className="font-semibold text-blue-700">Book</span> Store</h1>
            </Link>
            <div className="flex gap-1 items-center">
                {!user ? (
                    <>
                        <LoginLink className="small-btn">Sign In</LoginLink>
                        <span className="text-gray-500 text-sm">OR</span>
                        <RegisterLink className="small-outline-btn">Register</RegisterLink>
                    </>
                ) : (
                    <>
                    {/* Computer Screen */}
                    <div className="flex items-center gap-2 max-lg:hidden">
                        <Link href="/books/add" className="small-outline-btn">Add Book</Link>
                        <Link href="/dashboard" className="small-btn">Dashboard</Link>
                        <LogoutLink className="small-btn">Logout</LogoutLink>
                        
                        <Link href="/profile" className="flex items-center gap-2">
                            <Image
                                className="rounded-full"
                                src={user?.picture}
                                width={40}
                                height={40}
                                alt="user profile avatar"
                            />
                            <p className="font-semibold">
                                {user?.given_name} {user?.family_name}
                            </p>
                        </Link>
                    </div>

                    {/* Mobile Screen */}
                    <div className="lg:hidden flex relative cursor-pointer">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={()=> setToggleDropdown(prev => !prev)}
                        >
                            <Image
                                className="rounded-full"
                                src={user?.picture}
                                width={40}
                                height={40}
                                alt="user profile avatar"
                            />
                            <p className="max-sm:hidden font-semibold">
                                {user?.given_name} {user?.family_name}
                            </p>
                        </div>

                        {toggleDropdown &&
                            <div className="dropdown">
                                <Link
                                    href='/profile'
                                    onClick={()=> setToggleDropdown(false)}
                                    className='dropdown_link'
                                >
                                    My Profile
                                </Link>

                                <Link href="/books/add" className="w-full small-outline-btn">Add Book</Link>
                                <Link href="/dashboard" className="w-full small-btn">Dashboard</Link>
                                <LogoutLink className="w-full small-btn">Logout</LogoutLink>
                            </div>
                        }
                    </div>
                    </>
                )}
            </div>
        </nav>
    )
}