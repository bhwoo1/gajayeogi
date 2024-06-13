"use client"

import React from "react";
import Image from "next/image";

const MyPage:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col">
              <div className="flex flex-row py-12">
                  <div className="w-150 h-150 rounded-lg overflow-hidden">
                    {session?.user.image &&
                      <Image src={`${session?.user.image}`} alt="main" width={150} height={150} />
                    }
                  </div>
                  <div className="flex flex-col pl-6 pt-10">
                      <p className="text-2xl">오늘은 어떤 보물을 찾으러 오셨나요?</p>
                      <p className="text-3xl font-bold">{session?.user.name} 님.</p>
                  </div>
              </div>
        </main>
    );
}

export default MyPage;