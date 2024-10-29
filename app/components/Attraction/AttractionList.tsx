"use client"

import React from "react";
import { TourAttraction } from "../../Type";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { selectedAttractionAtom } from "../../recoil/RecoilContext";
import { useRouter } from "next/navigation";
import AttractionBlock from "./AttractionBlock";

const AttractionList = (props: { attractionArray: TourAttraction[] }) => {
    const [selectedAttraction, setSelectedAttraction] = useRecoilState(selectedAttractionAtom);
    const router = useRouter();

    const attractionClick = (attraction: TourAttraction) => {
        setSelectedAttraction(attraction);
        router.push(`/attraction/${attraction.contentid}`);
    };

    const handleMouseEnter = (attraction: TourAttraction) => {
        setSelectedAttraction(attraction);
    }

    return (
        <div 
            className="flex flex-col max-h-screen overflow-y-auto"
            style={{ maxHeight: '250px' }} // 이 줄을 통해 높이를 제한
        >
            {props.attractionArray?.map((attraction) => (
                <div 
                    className="flex flex-col" 
                    key={attraction.contentid} 
                    onClick={() => attractionClick(attraction)}
                    onMouseEnter={() => handleMouseEnter(attraction)}
                >
                    <AttractionBlock attractionData={attraction} />
                </div>
            ))}
        </div>
    );
}

export default AttractionList;