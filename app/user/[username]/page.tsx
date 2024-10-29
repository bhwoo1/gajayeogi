"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/components/Profile/UserProfile";
import { UserData } from "@/app/Type";
import ProfileAttractionList from "@/app/components/Profile/ProfileAttractionList";
import { useRecoilValue } from "recoil";
import { selectedUserAtom } from "@/app/recoil/RecoilContext";

// 유저 페이지
const UserPage = (props: {params: {username: string}}) => {
    const [userData, setUserData] = useState<UserData>();
    const selectedUser = useRecoilValue(selectedUserAtom);
    const router = useRouter();

    useEffect(() => {
      const formData = new FormData();
      formData.append("user", selectedUser);
      axios.post("https://gajayeogi.shop/readuser", formData, {
        withCredentials: true
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);


    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {userData &&
                <>
                  <UserProfile username={props.params.username} userData={userData} />
                  <div className="w-full max-w-4xl mt-8">
                    <div className="pb-12 border-b border-gray-200 mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{props.params.username} 님이 등록한 장소</h2>
                      {userData.postwriteids?.length ? (
                        <ProfileAttractionList ids={userData.postwriteids} />
                      ) : (
                        <p className="text-gray-600">{props.params.username} 님은 아직 등록하지 않으셨어요!</p>
                      )}
                    </div>
                  </div>
                </>
              }
        </main>
    );
}

export default UserPage;