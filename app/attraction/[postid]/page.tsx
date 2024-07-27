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

    useEffect(() => {
        axios.get("http://localhost:8080/postread", {
            params: { postid: props.params.postid }
        })
            .then((res) => {
                console.log(res.data);
                setAttractionData(res.data);
                setSelectedImage(res.data.postimgurl[0]);
                setSelectedIndex(0); // Set initial selected index
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.params.postid]);

    const imageChange = (image: string, index: number) => {
        setSelectedImage(image);
        setSelectedIndex(index); // Update the selected index
    }

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
                                <div className="flex flex-row">
                                    <h1 className="text-4xl font-bold mb-2">{attractionData.posttitle}</h1>
                                    <p className="ml-12 text-4xl cursor-pointer"><FaRegThumbsUp /></p>
                                </div>
                                <p className="text-gray-600 mb-4">{attractionData.postusername} 님이 등록</p>
                                <div className="mb-8">
                                    <p className="text-sm">{attractionData.postcontent}</p>
                                </div>
                                <div className="mb-8">
                                    <p className="text-gray-600 mb-2">위치: </p>
                                    <div className="mb-8">
                                        <AttractionMap 
                                            attractionLat={Number(attractionData.postxpoint)} 
                                            attractionLng={Number(attractionData.postypoint)} 
                                        />
                                        <p className="text-gray-600 mb-2 text-sm">지도를 클릭하시면 Naver 지도가 열립니다.</p>
                                    </div>
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