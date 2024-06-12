"use client"

import React from "react";
import "./MenuBar.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageAtom } from "@/app/recoil/RecoilContext";
import Link from "next/link";

const MenuBar:React.FC = () => {
    const [currentPage, setCurrentPage] = useRecoilState(PageAtom);

    return(
        <div className="w-full h-full p-4 flex flex-row justify-start">
            <Link href="/"><div className="pr-24 " onClick={() => setCurrentPage('home')}><p className={currentPage === 'home' ? `font-black text-xl cursor-pointer` : `text-xl font-gray-500`}>홈</p></div></Link>
            <Link href="/A"><div className="pr-24 " onClick={() => setCurrentPage('A')}><p className={currentPage === 'A' ? `font-black text-xl cursor-pointer` : `text-l font-gray-400`}>어쩌구</p></div></Link>
            <Link href="/B"><div className="pr-24 " onClick={() => setCurrentPage('B')}><p className={currentPage === 'B' ? `font-black text-xl cursor-pointer` : `text-l font-gray-400`}>저쩌구</p></div></Link>
        </div>
    );
}

export default MenuBar;