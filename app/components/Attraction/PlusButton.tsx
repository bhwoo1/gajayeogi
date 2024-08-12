import Link from "next/link";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const PlusButton = () => {
    return(
        <Link href="/registration">
            <button className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-medium py-1.5 px-3 rounded-md shadow-sm transition duration-200 ease-in-out transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm">게시글 추가</p>
            </button>
        </Link>
    );
}

export default PlusButton