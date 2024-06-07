"use client"
import Image from "next/image";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();

  const loginBtnClick = async () => {
    await signIn("naver", { redirect: true, callbackUrl: "/" });
    // await signIn("naver", {redirect: false});

}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-4">
        {session ?
            <button onClick={() => signOut()}>
              naver logout
            </button>
          :
          <button onClick={loginBtnClick}>
            naver login
          </button>
        }
       
      </div>
    </main>
  );
}
