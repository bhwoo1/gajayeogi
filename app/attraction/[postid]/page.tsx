"use client";

import AttractionMap from "@/app/components/AttractionMap";
import MenuBar from "@/app/components/layout/MenuBar";
import { RecieveAttraction } from "@/app/Type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineCircle, MdCircle } from "react-icons/md";
import { FaRegThumbsUp, FaThumbsUp  } from "react-icons/fa6";

const AttractionPage = (props: { params: { postid: number } }) => {
    const [attractionData, setAttractionData] = useState<RecieveAttraction>();
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(0); // Track the selected index
    const [suggested, setSuggested] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        axios.get("http://localhost:8080/postread", {
            params: { postid: props.params.postid }
        })
            .then((res) => {
                console.log(res.data);
                setAttractionData(res.data);
                setSelectedImage(res.data.postimgurl[0]);
                setSelectedIndex(0);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.params.postid]);

    const imageChange = (image: string, index: number) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    }

    const suggestClick = () => {
        const formData = new FormData();
        formData.append("postid", String(attractionData?.postid));
        formData.append("postuser", String(attractionData?.postuser));
        axios.post("http://localhost:8080/postsuggest", formData,  {
            withCredentials: true,
        })
        .then((res) => {
            alert("추천했습니다!");
            setSuggested(true);
        })
        .catch((err) => {
            console.log(err);
            alert("추천에 실패하였습니다.");
        })
    }

    const unsuggestClick = () => {
        const formData = new FormData();
        formData.append("postid", String(attractionData?.postid));
        formData.append("postuser", String(attractionData?.postuser));
        axios.post("http://localhost:8080/unpostsuggest", formData, {
            withCredentials: true,
        })
        .then((res) => {
            alert("추천 해제하였습니다!");
            setSuggested(false);
        })
        .catch((err) => {
            console.log(err);
            alert("추천 해제에 실패하였습니다.");
        })
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

    return (
        <main className="flex min-h-screen flex-col p-24">
            <MenuBar currentPage={"B"} />
            <div className="flex flex-col items-center">
                {attractionData && (
                    <>
                        <div className="flex flex-row gap-8 mb-8">
                            <div className="flex flex-col mr-24">
                                <div className="relative w-96 h-96 overflow-hidden mb-12">
                                    <img src={"http://localhost:8080/" + selectedImage} alt="selected_image" className="w-full h-full object-contain rounded-md"   />
                                </div>
                                <div className="flex flex-row gap-2">
                                    {attractionData?.postimgurl?.map((image, index) => (
                                        <div key={index} className="relative w-12 h-12 cursor-pointer" onClick={() => imageChange(image, index)}>
                                            {selectedIndex === index ? <p className="text-gray-300"><MdCircle size={24} /></p> : <p className="text-gray-200"><MdOutlineCircle size={24} /></p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-4xl font-bold mb-2">{attractionData.posttitle}</h1>
                                <p className="text-gray-600 mb-4">{attractionData.postusername} 님이 등록</p>
                                <div className="mb-8">
                                    <p className="text-sm">{attractionData.postcontent}</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-600 mb-2">위치: </p>
                                    <div className="mb-2">
                                        <AttractionMap 
                                            attractionLat={Number(attractionData.postxpoint)} 
                                            attractionLng={Number(attractionData.postypoint)} 
                                        />
                                        <p className="text-gray-600 mb-2 text-sm">지도를 클릭하시면 Naver 지도가 열립니다.</p>
                                    </div>
                                </div>
                                <div className="mb-8">
                                    {suggested ? 
                                            <div className="flex flex-row">
                                            <p className="ml-24 mr-2 text-5xl text-gray-600 cursor-pointer" 
                                                onClick={unsuggestClick}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>
                                                    <FaThumbsUp />
                                            </p>
                                            <div className={`flex items-center bg-gray-600 rounded-full px-3 py-1 mt-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                                <span className="text-white text-sm font-bold">이미 추천했어요!</span>
                                            </div>
                                        </div>
                                        :
                                            <div className="flex flex-row">
                                                <p className="ml-24 mr-2 text-5xl text-gray-600 cursor-pointer" 
                                                    onClick={suggestClick}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}>
                                                        <FaRegThumbsUp />
                                                </p>
                                                <div className={`flex items-center bg-gray-600 rounded-full px-3 py-1 mt-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                                    <span className="text-white text-sm font-bold">추천하실래요?</span>
                                                </div>
                                            </div>
                                    } 
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default AttractionPage;