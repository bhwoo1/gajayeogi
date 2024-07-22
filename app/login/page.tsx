"use client"

import React from "react";
import MenuBar from "../components/layout/MenuBar";
import { signIn } from "next-auth/react";

const loginBtnClick = async () => {
    await signIn("naver", { redirect: true, callbackUrl: "/" }); 
}

const LoginPage:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center p-24">
            <MenuBar currentPage={"Others"} />
            <img src="/gajayeogi.png" alt="logo" width='400' height='200' className="mb-2"/>
            <h2 className="font-bold">로그인이 필요해요.</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 p-4 mt-12 rounded w-1/3" onClick={loginBtnClick}><p>로그인</p></button>
        </main>
    );
}

export default LoginPage;