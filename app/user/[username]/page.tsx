"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/components/Profile/UserProfile";

// 유저 페이지
const UserPage = (props: {params: {username: string}}) => {
    const [scrapIds, setScrapIds] = useState<string[]>([]);
    const [writeIds, setWriteIds] = useState<string[]>([]);
    const [visitIds, setVisitIds] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {

      const formData = new FormData();
      formData.append("user", props.params.username)
      axios.post("http://localhost:8080/readuser", formData, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res.data);
        setScrapIds(res.data.scrapids);
        setWriteIds(res.data.writeids);
        setVisitIds(res.data.visitids);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);


    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UserProfile username={props.params.username} visitIds={visitIds} writeIds={writeIds} />
        </main>
    );
}

export default UserPage;