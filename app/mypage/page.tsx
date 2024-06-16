"use client"

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import MyProfile from "../components/MyProfile";

// 마이 페이지
const MyPage:React.FC = () => {
    const {data: session, status: sessionStatus} = useSession();

    useEffect(() => {
      if (sessionStatus === "loading") return; // 세션 로딩 중일 때는 아무것도 하지 않음
      if (!session) {
        signIn("naver", { redirect: true });
      }
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