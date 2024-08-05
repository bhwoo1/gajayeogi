"use client"

import React from "react";
import { TourAttraction } from "../../Type";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { selectedAttractionAtom } from "../../recoil/RecoilContext";
import { useRouter } from "next/navigation";

const AttractionList = (props: {attractionArray: TourAttraction[]}) => {
    const [selectedAttraction, setSelectedAttraction] = useRecoilState(selectedAttractionAtom);
    const router = useRouter();

    const attractionClick = (attraction: TourAttraction) => {
        setSelectedAttraction(attraction);
        router.push(`/attraction/${attraction.contentid}`);
    }   
    

    return(
        <div>
            {props.attractionArray?.map((attraction) => (
                <div className="flex flex-col" key={attraction.contentid}>
                    <button onClick={() => attractionClick(attraction)}>{attraction.title}</button>
                </div>
            ))}
        </div>
    );
}

export default AttractionList;