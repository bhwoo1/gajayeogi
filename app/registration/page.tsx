"use client"

import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import { Attraction } from "../Type";

const initialAttractionState:Attraction = {
    attractionimages: [],
    attractionname: "",
    attractionlocation: "",
    attractioncategory: "",
    attractionexplain: ""
}

const Registration:React.FC = () => {
    const [attraction, setAttraction] = useState<Attraction>(initialAttractionState);
    const {data: session, status: sessionStatus} = useSession();


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const selectedImages = Array.from(e.target.files).slice(0, 5); // 최대 5개의 이미지 선택
          if (attraction.attractionimages.length + selectedImages.length <= 5) {
            setAttraction(prevAttraction => ({
              ...prevAttraction,
              attractionimages: [...prevAttraction.attractionimages, ...selectedImages]
            }));
          } else {
            alert("최대 5개까지의 이미지만 업로드할 수 있습니다.");
          }
        }
    };

    const handleRemoveImage = (index: number) => {
        setAttraction(prevAttraction => ({
          ...prevAttraction,
          attractionimages: prevAttraction.attractionimages.filter((_, i) => i !== index)
        }));
      };


    return(
        <main className="flex min-h-screen flex-col p-24">
            {session ? 
                <>
                    <h2 className="text-3xl font-semibold mb-6">관광지 등록</h2>
                    <form className="space-y-6">
                        <div className="flex flex-col">
                        {/* 이미지 미리보기 */}
                        <div className="flex space-x-4 mt-6">
                            {attraction.attractionimages.map((image, index) => (
                            <div key={index} className="relative w-32 h-32" onClick={() => handleRemoveImage(index)}>
                                <img src={URL.createObjectURL(image)} alt={`상품 이미지 ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                            </div>
                            ))}
                        </div>
                        <label htmlFor="image" className="mb-1">상품 사진 (최대 5개):</label>
                        <input type="file" name="auctionimages" id="image" multiple onChange={handleImageChange} className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="auctiontitle" className="mb-1">관광지 이름:</label>
                            <input type="text" id="attractionname" name="auctiontitle" value={attraction.attractionname} className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="auctiontitle" className="mb-1">카테고리:</label>
                            <select className="border rounded-md py-1 px-2" id="auctioncategory" name="auctioncategory" value={attraction.attractioncategory} >
                                <option value="all" selected>
                                전체
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractionlocation" className="mb-1">위치:</label>
                            <input type="text" id="auctionprice" name="auctionprice" value={attraction.attractionlocation} className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-1">설명:</label>
                            <textarea id="description" name="auctioncontent" value={attraction.attractionexplain} className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">등록</button>
                    </form>
                </>
            :
                <div className='flex justify-center items-center'>
                    <p className='font-semibold text-gray-700'>로그인이 필요합니다.</p>
                </div>
            }
        </main>
    );
}

export default Registration;