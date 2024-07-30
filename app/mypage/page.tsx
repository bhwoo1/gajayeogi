"use client"

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import MyProfile from "../components/MyProfile";
import axios from "axios";

// 마이 페이지
const MyPage:React.FC = () => {
    const {data: session, status: sessionStatus} = useSession();

    useEffect(() => {
      if (sessionStatus === "loading") return; // 세션 로딩 중일 때는 아무것도 하지 않음
      if (!session) {
        signIn("naver", { redirect: true });
      }
      
      axios.get("http://localhost:8080/readuser", {
        params : {
          user: session?.user?.email
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }, [session, sessionStatus]);


    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {session ? 
            <MyProfile />
          :
            <div className='flex justify-center items-center'>
              <p className='font-semibold text-gray-700'>로그인이 필요합니다.</p>
            </div>
          }
            
        </main>
    );
}

export default MyPage;