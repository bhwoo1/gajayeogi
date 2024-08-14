// "use client"

// import { signIn, useSession } from "next-auth/react";
// import React, { useEffect, useState } from "react";
// import MyProfile from "../components/Profile/MyProfile";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { UserData } from "../Type";
// import ProfileAttractionList from "../components/Profile/ProfileAttractionList";

// // 마이 페이지
// const MyPage:React.FC = () => {
//     const {data: session, status: sessionStatus} = useSession();
//     const [userData, setUserData] = useState<UserData>();
//     const [scrapIds, setScrapIds] = useState<string[]>([]);
//     const [writeIds, setWriteIds] = useState<string[]>([]);
//     const [visitIds, setVisitIds] = useState<string[]>([]);
//     const router = useRouter();

//     useEffect(() => {
//       if (sessionStatus === "loading") return; // 세션 로딩 중일 때는 아무것도 하지 않음
//       if (!session) {
//         // signIn("naver", { redirect: true });
//         router.push("/login");
//       }
//     }, [session, sessionStatus]);

//     useEffect(() => {

//       const formData = new FormData();
//       formData.append("user", String(session?.user?.email))
//       axios.post("http://localhost:8080/readuser", formData, {
//         withCredentials: true
//       })
//       .then((res) => {
//         console.log(res.data);
//         setUserData(res.data);
//         console.log(res.data.visitids.length);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//     }, []);


//     return(
//         <main className="flex min-h-screen flex-col items-center justify-between p-24">
//           {session ? 
//             <>
//               {userData &&
//                 <>
//                   <MyProfile userData={userData} />
//                   <div className="pb-12">
//                     <p>내가 등록한 장소</p>
//                     {userData.postwriteids ? 
//                         <>
//                           {userData.postwriteids.length === 0 ?
//                               <p>회원님의 비밀의 장소를 등록해보세요!</p>
//                             :
//                               <ProfileAttractionList ids={userData.postwriteids} />
//                           }
//                         </>
//                       :
//                         <p>회원님의 비밀의 장소를 등록해보세요!</p>
//                     }
//                   </div>
//                   <div className="pb-12">
//                     <p>내가 주목하는 장소</p>
//                     {userData.scrapids ? 
//                         <>
//                           {userData.scrapids.length === 0 ?
//                               <p>회원님의 마음에 드는 장소를 등록해보세요!</p>
//                             :
//                               <ProfileAttractionList ids={userData.scrapids} />
//                           }
//                         </>
//                       :
//                         <p>회원님의 마음에 드는 장소를 등록해보세요!</p>
//                     }
//                   </div>
//                   <div className="pb-12">
//                     <p>내가 방문한 장소</p>
//                     {userData.visitids ? 
//                         <>
//                           {userData.visitids.length > 0 ?
//                               <ProfileAttractionList ids={userData.visitids} />
//                             :
//                               <p>다른 회원님의 비밀의 장소를 방문해보세요!</p>
//                           }
//                         </>
//                       :
//                         <p>다른 회원님의 비밀의 장소를 방문해보세요!</p>
//                     }
//                   </div>
//                 </>
//               }
//             </>
            
//           :
//             <div className='flex justify-center items-center'>
//               <p className='font-semibold text-gray-700'>로그인이 필요합니다.</p>
//             </div>
//           }
            
//         </main>
//     );
// }

// export default MyPage;

"use client"

import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import MyProfile from "../components/Profile/MyProfile";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserData } from "../Type";
import ProfileAttractionList from "../components/Profile/ProfileAttractionList";

// 마이 페이지
const MyPage:React.FC = () => {
    const {data: session, status: sessionStatus} = useSession();
    const [userData, setUserData] = useState<UserData>();
    const router = useRouter();

    useEffect(() => {
      if (sessionStatus === "loading") return;
      if (!session) {
        router.push("/login");
      }
    }, [session, sessionStatus]);

    useEffect(() => {
      if (!session?.user?.email) return;

      const formData = new FormData();
      formData.append("user", String(session?.user?.email));
      
      axios.post("http://localhost:8080/readuser",formData)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [session]);

    return(
        <main className="flex flex-col items-center justify-between min-h-screen p-6 sm:p-12">
          {session ? 
            <>
              {userData &&
                <>
                  <MyProfile userData={userData} />
                  <div className="w-full max-w-4xl mt-8">
                    <div className="pb-12 border-b border-gray-200 mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">내가 등록한 장소</h2>
                      {userData.postwriteids?.length ? (
                        <ProfileAttractionList ids={userData.postwriteids} />
                      ) : (
                        <p className="text-gray-600">회원님의 비밀의 장소를 등록해보세요!</p>
                      )}
                    </div>

                    <div className="pb-12 border-b border-gray-200 mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">내가 주목하는 장소</h2>
                      {userData.scrapids?.length ? (
                        <ProfileAttractionList ids={userData.scrapids} />
                      ) : (
                        <p className="text-gray-600">회원님의 마음에 드는 장소를 등록해보세요!</p>
                      )}
                    </div>

                    <div className="pb-12">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">내가 방문한 장소</h2>
                      {userData.visitids?.length ? (
                        <ProfileAttractionList ids={userData.visitids} />
                      ) : (
                        <p className="text-gray-600">다른 회원님의 비밀의 장소를 방문해보세요!</p>
                      )}
                    </div>
                  </div>
                </>
              }
            </>
          :
            <div className="flex justify-center items-center">
              <p className="font-semibold text-gray-700">로그인이 필요합니다.</p>
            </div>
          }
        </main>
    );
}

export default MyPage;