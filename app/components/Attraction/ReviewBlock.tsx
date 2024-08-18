import { ReviewData, TourAttraction } from "@/app/Type";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import ImageModal from "./ImgaeModal";

const ReviewBlock = (props: {review: ReviewData}) => {
    const {data: session} = useSession();
    const [editCommentMode, setEditCommentMode] = useState<boolean>(false);
    

    const deleteComment = (reviewid: string, username: string) => {
        axios.delete(`http://localhost:8080/reviewdelete`, {
            params: {
                reviewid: reviewid,
                reviewuser: username
            },
            withCredentials: true
        })
        .then((res) => {
            alert('댓글을 삭제했습니다.');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    };


    return (
        <div className="relative flex flex-row w-full p-4 bg-white rounded-lg">
            <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                {props.review.reviewimgurl && (
                    <div>
                        <img
                            src={"http://localhost:8080/" + props.review.reviewimgurl}
                            alt="title_img"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-between flex-grow ml-4 h-full">
                <div className="mb-2 flex-shrink-0">
                    <p className="text-sm text-gray-500">
                        {props.review.reviewusername}
                    </p>
                </div>
                <div className="flex flex-row items-center mt-2 flex-grow">
                    <FaQuoteLeft className="text-2xl text-gray-400 mr-2" />
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                        {props.review.reviewcontent.replace(/§/g, " ")}
                    </p>
                    <FaQuoteRight className="text-2xl text-gray-400 ml-2" />
                </div>
            </div>
            {props.review.reviewuser === session?.user?.email && (
                <button
                    className="absolute top-2 right-2 px-3 py-1 text-sm"
                    onClick={() => deleteComment(props.review.reviewid, props.review.reviewuser)}
                >
                    삭제
                </button>
            )}


        </div>

        
    );
}

export default ReviewBlock;