"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UserData } from "@/app/Type";
import axios from "axios";
import { useRouter } from "next/navigation";


// 프로필 컴포넌트
const MyProfile = (props: { userData: UserData }) => {
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [introduction, setIntroduction] = useState<string>(props.userData.introduction || "");
  const [charCount, setCharCount] = useState<number>(introduction.length);
  const maxLength = 50;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", String(session?.user?.email));
    formData.append("introduction", introduction);
    axios.post("https://gajayeogi.shop/savenintroduction", formData, {
      withCredentials: true,
    })
    .then((res) => {
      alert('자기소개가 수정되었습니다!');
      setEditMode(!editMode);
      window.location.reload();
    })
    .catch((err) => {
      alert('자기소개 수정에 실패하였습니다!');
      console.log(err);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIntroduction(value);
    setCharCount(value.length);
  };

  const cancelBtnClick = () => {
    setEditMode(false);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row py-12">
        <div className="w-300 h-300 rounded-full overflow-hidden border-4 border-gray-300">
          {session?.user?.image && (
            <Image src={`${session?.user.image}`} alt="main" width={150} height={150} />
          )}
        </div>
        <div className="flex flex-col pl-6 pt-10">
          <p className="text-3xl font-bold">{session?.user?.name} 님.</p>
          <p className="text-xl font-bold">{session?.user?.email}</p>
          <div className="flex flex-row">
            {/* <p className="mr-4">리뷰 작성: {props.userData?.reviewwriteids?.length || 0}</p> */}
            <p>등록: {props.userData?.postwriteids?.length || 0}</p>
          </div>
        </div>
      </div>
      {editMode ? (
        <>
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                value={introduction}
                onChange={handleInputChange}
                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  charCount > maxLength ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                <span
                  className={`text-sm ${charCount > maxLength ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {charCount}/{maxLength}
                </span>
                {charCount > maxLength && (
                  <span className="text-sm text-red-500">50자를 초과할 수 없습니다.</span>
                )}
              </div>
              <button
                className="bg-blue-500 text-white text-sm mt-2 rounded-md hover:bg-blue-600 transition duration-300"
                type="submit"
                disabled={charCount > maxLength} // 50자 초과 시 버튼 비활성화
              >
                확인
              </button>
              <button
                className="bg-red-500 text-white text-sm mt-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={cancelBtnClick}
              >
                취소
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <p className="text-sm text-gray-700">{props.userData.introduction}</p>
          </div>
          <button
            className="bg-gray-200 text-gray-700 text-sm mt-2 rounded-md hover:bg-gray-300 transition duration-300"
            onClick={() => setEditMode(!editMode)}
          >
            자기소개 수정
          </button>
        </>
      )}
    </div>
  );
};

export default MyProfile;