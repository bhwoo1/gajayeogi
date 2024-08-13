"use client"

import React from "react";
import "./MenuBar.css";
import Link from "next/link";

type Props = {
    currentPage: string
}

const MenuBar:React.FC<Props> = ( {currentPage} ) => {

    return(
        <div className= "w-full h-full flex flex-row justify-start">
             <Link href="/">
                <div className="p-8 cursor-pointer">
                    <p className={currentPage === 'home' ? 
                            'font-bold text-xl text-gray-800 pb-2 border-b-4 border-black' 
                        : 
                            'text-base text-gray-500 hover:text-gray-700'
                    }>
                        홈
                    </p>
                </div>
            </Link>
            <Link href="/gohere">
                <div className="p-8 cursor-pointer">
                    <p className={currentPage === 'A' ? 
                            'font-bold text-xl text-gray-800 pb-2 border-b-4 border-black' 
                        : 
                            'text-base text-gray-500 hover:text-gray-700'
                        }>
                        여기갈래?
                    </p>
                </div>
            </Link>
            <Link href="/wherewego">
                <div className="p-8 cursor-pointer">
                    <p className={currentPage === 'B' ? 
                            'font-bold text-xl text-gray-800 pb-2 border-b-4 border-black' 
                        : 
                            'text-base text-gray-500 hover:text-gray-700'
                        }>
                        어디갈까?
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default MenuBar;