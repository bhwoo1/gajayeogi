"use client"

import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

const MyPage:React.FC = () => {
    const {data: session, status: sessionStatus} = useSession();


    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col">
              <div className="flex flex-row py-12">
                  <div className="w-150 h-150 rounded-full overflow-hidden border-4 border-gray-300">
                    {session?.user?.image &&
                      <Image src={`${session?.user.image}`} alt="main" width={150} height={150} />
                    }
                  </div>
                  <div className="flex flex-col pl-6 pt-10">
                      <p className="text-3xl font-bold">{session?.user?.name} 님.</p>
                      <div className="flex flex-row">
                        <p className="mr-4">방문: 0</p>
                        <p>등록: 0</p>
                    </div>
                  </div>
                </div>
              </div>
        </main>
    );
}

export default MyPage;