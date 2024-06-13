"use client"

import React from "react";
import "./MenuBar.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageAtom } from "@/app/recoil/RecoilContext";
import Link from "next/link";

const MenuBar:React.FC = () => {
    const [currentPage, setCurrentPage] = useRecoilState(PageAtom);

    return(
        <div className="w-full h-full flex flex-row justify-start">
             <Link href="/">
                <div className="p-8 cursor-pointer " onClick={() => setCurrentPage('home')}>
                    <p className={currentPage === 'home' ? 'font-bold text-xl text-gray-800 pb-2 border-b-4 border-black' : 'text-base text-gray-500 hover:text-gray-700'}>
                        홈
                    </p>
                </div>
            </Link>
            <Link href="/A">
                <div className="p-8 cursor-pointer" onClick={() => setCurrentPage('A')}>
                    <p className={currentPage === 'A' ? 'font-bold text-xl text-gray-800 pb-2 border-b-4 border-black' : 'text-base text-gray-500 hover:text-gray-700'}>
                        어쩌구
                    </p>
                </div>
            </Link>
            <Link href="/B">
                <div className="p-8 cursor-pointer" onClick={() => setCurrentPage('B')}>
                    <p className={currentPage === 'B' ? 'font-bold text-xl text-gray-800 pb-2 border-b-4 border-black' : 'text-base text-gray-500 hover:text-gray-700'}>
                        저쩌구
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default MenuBar;