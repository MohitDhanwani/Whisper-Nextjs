'use client'
import Link from 'next/link'
import React from 'react'
import { Home, MessageSquare, LogIn } from "lucide-react";
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  
  const session = useSession();
  const router = useRouter();

  const HandleGoogleSignIn = async () => {
    await signIn("google");
  }

  const HandleSignout = async () => {
    await signOut();
    router.push("/");
  }

  const RedirectUserToMessage = async () => {

    if(!session.data?.user){
      alert("Please sign in before moving further!");
      return;
    }

    const getUserId = await fetch("http://localhost:3000/api/getUserId" , {
      method: "POST",
      body: JSON.stringify({ userEmail: session.data?.user?.email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(!getUserId.ok){
        const errorUserId = await getUserId.json();
        console.error(errorUserId || "Error while getting user id");
    }

    const userIdFromResponse = await getUserId.json();
    router.push(`${userIdFromResponse.userID}`)
  }

  return (
    <div className='bg-[rgb(10,10,15)] flex justify-around h-16 items-center border-b-2 w-full '>

        <div className='w-full xl:w-1/12 md:w-4/12 sm:w-6/12'>
            <h1 className='font-bold font-jetbrains text-gradient text-2xl ml-4'>
                Whisper
            </h1>
        </div>

        <div className='text-white flex justify-between font-jetbrains xl:ml-52 md:ml-48 sm:ml-32 xs:ml-32 text-sm w-full xl:w-4/12 lg:w-4/12 sm-w-3/12 px-2'>
            <span className='flex items-center'>
            <Home size={20}/>
            <Link href={"/"} className='ml-2 hidden sm:block cursor-pointer z-10'>Home</Link>
            </span>

            <span className='flex items-center'>
            <MessageSquare size={20}/>
            <button className='ml-2 hidden sm:block z-10' onClick={RedirectUserToMessage}>Messages</button>
            </span>

            <span className='flex items-center bg-gradient-to-r from-[#6E3CBC] to-[#00F5FF] p-2 px-4 rounded-lg'>
            <LogIn size={20}/>

            {!session.data?.user && <button className='ml-2 hidden sm:block cursor-pointer z-10' onClick={HandleGoogleSignIn}>Sign In</button>}
            {session.data?.user && <button className='ml-2 hidden sm:block cursor-pointer z-10' onClick={HandleSignout}>Logout</button>}
            
            </span>
        </div>
    </div>
  )
}