"use client"

import React from "react";
import MenuBar from "../components/layout/MenuBar";
import Link from "next/link";
import UserAttractionList from "../components/Attraction/UserAttractionList";
import { FaSearch, FaPlusCircle  } from 'react-icons/fa';

const B: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <main className="flex min-h-screen flex-col w-full items-center p-24">
            <MenuBar currentPage={"B"} />
            <div className="w-full max-w-5xl mx-auto mb-4">
                <form onSubmit={handleSubmit} className="w-full border p-2 rounded-lg bg-gray-100 flex flex-row">
                    <select className="bg-gray-100 mr-2">
                        <option selected>이름</option>
                        <option>작성자</option>
                    </select>
                    <input
                        type="text"
                        className="w-full bg-gray-100 focus:outline-none"
                        placeholder="검색할 내용을 입력해주세요."
                    />
                    <button className="p-2"><FaSearch /></button>
                </form>
            </div>
            <Link href="/registration">
                <button>
                    <p className="text-4xl text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out"><FaPlusCircle /></p>
                </button>
            </Link>
            <UserAttractionList />
        </main>
    );
}

export default B;