"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";


const NavBar:React.FC = () => {
    const {data: session} = useSession();

    const loginBtnClick = async () => {
        await signIn("naver", { redirect: true, callbackUrl: "/" });
        // await signIn("naver", {redirect: false});
  
    }

    return(
        <header className="fixed left-0 right-0 top-0 py-4 z-50 user-not-selectable">
        <nav className="container mx-auto flex items-center justify-between">
            <Link href="/"><img src="/gajayeogi.png" alt="logo" width='150' height='30' /></Link>
            <ul className="flex items-center justify-end space-x-4">
            {session ? 
                    (   
                        <ul className="flex items-center justify-end space-x-4">
                            <li>
                                <Link href="/mypage"><p className="text-white cursor-pointer font-bold">{session?.user?.name} 님</p></Link>
                            </li>
                            <li>
                                <button onClick={() => signOut()}><p>로그아웃</p></button>
                            </li>
                        </ul>
                    ) 
                : 
                    (
                        <li>
                            <button onClick={loginBtnClick}><p>로그인</p></button>
                        </li>
                    )
                }
            </ul>
        </nav>
        </header>
    );
}

export default NavBar;