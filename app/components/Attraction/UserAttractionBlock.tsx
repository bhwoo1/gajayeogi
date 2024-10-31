import { RecieveAttraction } from "@/app/Type";
import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const UserAttractionBlock = (props: { attractionData: RecieveAttraction }) => {
    const postimgurl = props.attractionData.postimgurl[0].replace("/home/ftpuser", "");
    

    const makeShortContent = (content: string) => {
        if (content.length > 30) {
            return content.substring(0,30) + "...";
        }
        else {
            return content.replace(/§/g, " ");
        }
    }

    const shortContent = makeShortContent(props.attractionData.postcontent);

    return (
        <div className="cursor-pointer flex flex-row w-full max-w-none p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-300 h-44">
            <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                <img
                    src={`https://gajayeogi.shop${postimgurl}`}
                    alt="title_img"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex flex-col justify-between flex-grow ml-4 h-full">
                <div className="mb-2 flex-shrink-0">
                    <p className="text-xl font-bold text-gray-800">
                        {props.attractionData.posttitle}
                    </p>
                    <p className="text-sm text-gray-500">
                        {props.attractionData.postusername} 님이 등록
                    </p>
                </div>
                <div className="flex flex-row items-center mt-2 flex-grow">
                    <FaQuoteLeft className="text-2xl text-gray-400 mr-2" />
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                        {shortContent}
                    </p>
                    <FaQuoteRight className="text-2xl text-gray-400 ml-2" />
                </div>
                <div className="flex flex-row items-center mt-2">
                    <p className="text-sm text-gray-500">
                        주소: {props.attractionData.postlocation}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserAttractionBlock;