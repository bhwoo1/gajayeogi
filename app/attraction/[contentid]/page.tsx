"use client"

import MenuBar from "@/app/components/layout/MenuBar";
import AttractionMap from "@/app/components/Map/AttractionMap";
import { selectedAttractionAtom } from "@/app/recoil/RecoilContext";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";


const AttractionPage = (props: {params: {contentid: string}}) => {
    const selectedAttraction = useRecoilValue(selectedAttractionAtom);

    useEffect(() => {
        console.log(selectedAttraction);
    })

    return(
        <main className="flex min-h-screen flex-col p-24">
            <MenuBar currentPage={"A"} />
            <div className="flex flex-col items-center">
            <div className="flex flex-row gap-8 mb-8">
                <div className="flex flex-col mr-24">
                    {selectedAttraction.firstimage != "" &&
                        <div className="relative w-96 h-96 overflow-hidden mb-12">
                            <img src={selectedAttraction.firstimage} alt="selected_image" className="w-full h-full object-contain rounded-md"   />
                        </div>
                    }
                    
                    {/* <div className="flex flex-row gap-2">
                        {attractionData?.postimgurl?.map((image, index) => (
                            <div key={index} className="relative w-12 h-12 cursor-pointer" onClick={() => imageChange(image, index)}>
                                {selectedIndex === index ? <p className="text-gray-300"><MdCircle size={24} /></p> : <p className="text-gray-200"><MdOutlineCircle size={24} /></p>}
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-2">{selectedAttraction.title}</h1>
                        <p className="text-gray-600 mb-4">자료 제공 : 한국관광공사</p>
                        {/* <div className="mb-8">
                            <p className="text-sm">
                                {attractionData?.postcontent && attractionData.postcontent.split('§').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                            <br />
                                        </React.Fragment>
                                ))}
                            </p>
                        </div> */}
                        <div className="mb-2">
                            <p className="text-gray-600 mb-2 text-sm">위치: {selectedAttraction.addr1} {selectedAttraction.addr2}</p>
                            <div className="mb-2">
                                <AttractionMap 
                                    attractionLat={Number(selectedAttraction.mapy)} 
                                    attractionLng={Number(selectedAttraction.mapx)} 
                                />
                                <p className="text-gray-600 mb-2 text-sm">지도를 클릭하시면 Naver 지도가 열립니다.</p>
                            </div>
                        </div>
                        <div className="mb-8">
                
                        </div>
                        </div>
                    </div>
            </div>
        </main>
    );
}


export default AttractionPage;