"use client"

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UserData } from "@/app/Type";

// 프로필 컴포넌트
const MyProfile = (props: {userData: UserData}) => {
    const {data: session, status: sessionStatus} = useSession();

    return(
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
                      <p className="mr-4">방문: {props.userData?.visitids?.length || 0}</p>
                      <p>등록: {props.userData?.postwriteids?.length || 0} </p>
                  </div>
                </div>
              </div>
            </div>
    );
}

export default MyProfile;