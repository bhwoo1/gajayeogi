import { TourAttraction } from "@/app/Type";
import React from "react";

const AttractionBlock = (props: {attractionData: TourAttraction}) => {
    return(
        <div className="cursor-pointer flex flex-row w-full p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-300">
            <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                {props.attractionData.firstimage &&
                    <img
                        src={props.attractionData.firstimage}
                        alt="title_img"
                        className="w-full h-full object-cover rounded-md"
                    />
                }
            </div>
            <div className="flex flex-col justify-between flex-grow ml-4">
                <div className="mb-2">
                    <p className="text-xl font-bold text-gray-800">
                        {props.attractionData.title}
                    </p>
                    <p className="text-sm text-gray-500">
                        자료제공 : 한국관광공사
                    </p>
                </div>
                <div className="flex flex-row items-center mt-2">
                    <p className="text-sm text-gray-500">
                        주소: {props.attractionData.addr1} {props.attractionData.addr2}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AttractionBlock;