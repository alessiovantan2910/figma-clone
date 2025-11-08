"use client";

import { register } from "../actions/auth";
import Link from "next/link"
import { useActionState } from "react";

export default function Page(){
    const [errorMessage, fromAction, isPending] = useActionState(
       register,
       undefined,
 );
    return <div className="flex min-h-screen items-center justify-center bg-white px-4  ">
        <div className="w-full max-w-sm space-y-6 ">
            <h1 className="text-center text-2xl font-bold text-gray-600">
                SignUp
                </h1>
                <form action={fromAction} className="space-y-4">
                    <div className="relative h-fit">
                    <input className="w-full rounded-md border border-gray-300 text-sm px-3 pt-7 focus:border-black focus:outline-none" 
                    type="email" 
                    name="email"
                     required
                     />
                    <label className="absolute left-3 top-2 text-[12px]">Email</label>
                    </div>
                    <div className="relative h-fit">
                    <input className="w-full rounded-md border border-gray-300 text-sm px-3 pt-7 focus:border-black focus:outline-none" 
                    type="password" 
                    name="password"
                    minLength={8}
                     required
                     />
                    <label className="absolute left-3 top-2 text-[12px]">Password</label>
                    </div>
                    <button className="w-full rounded-md  bg-black text-white py-2 text-sm font-bold hover:bg-gray-600 focus:outline-none disabled:cursor-not-allowed  disabled:bg-gray-300">
                        Register
                        </button>
                        <p className="text-center text-xs text-gray-500 ">アカウントは既にありますか？<Link  className="text-blue-400 hover:text-blue-600" href="/signin">
                        ログイン</Link>
                        </p>
                        {errorMessage && (<p className="text-center text-sm text-red-500">{errorMessage}</p>)}
                </form>
        </div>
    </div>
}