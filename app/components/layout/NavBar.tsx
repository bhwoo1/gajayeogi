"use client"

import { PageAtom } from "@/app/recoil/RecoilContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";


const NavBar:React.FC = () => {
    const {data: session} = useSession();
    const [currentPage, setCurrentPage] = useRecoilState(PageAtom);

    const loginBtnClick = async () => {
        await signIn("naver", { redirect: true, callbackUrl: "/" });
        // await signIn("naver", {redirect: false});
  
    }

    return(
        <header className="fixed left-0 right-0 top-0 py-4 z-50 user-not-selectable bg-white">
        <nav className="container mx-auto flex items-center justify-between">
            <Link href="/"><img src="/gajayeogi.png" alt="logo" width='150' height='30' onClick={() => setCurrentPage('home')}/></Link>
            <ul className="flex items-center justify-end space-x-4">
            {session ? 
                    (   
                        <ul className="flex items-center justify-end space-x-4">
                            <Link href="/mypage">
                                <ul className="cursor-pointer flex items-center justify-end space-x-4">
                                    <li>
                                        <div className="rounded-full overflow-hidden border-gray-300 border-2">
                                            {session?.user?.image &&
                                                <Image src={`${session?.user.image}`} alt="main" width={30} height={30} />
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <p className="font-bold">{session?.user?.name}</p>
                                    </li>
                                </ul>
                            </Link>
                            <li>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}><p>로그아웃</p></button>
                            </li>
                        </ul>
                    ) 
                : 
                    (
                        <li>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={loginBtnClick}><p>로그인</p></button>
                        </li>
                    )
                }
            </ul>
        </nav>
        </header>
    );
}

export default NavBar;