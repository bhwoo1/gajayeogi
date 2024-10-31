import { ReviewData } from "@/app/Type";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AttractionBlock from "./AttractionBlock";
import ReviewBlock from "./ReviewBlock";
import ImageModal from "./ImgaeModal";

const initialReviewState: ReviewData = {
    originalpostid: "",
    reviewcontent: "",
    reviewid: "",
    reviewimg: null,
    reviewoldimg: "",
    reviewtitle: "",
    reviewuser: "",
    reviewusername: "",
    reviewxpoint: "",
    reviewypoint: "",
    visitcount: "",
    reviewimgurl: [], 
    reviewlocation: ""
}

const Review = (props: {postuser: string, postid: string}) => {
    const {data: session} = useSession();
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const [newReview, setNewReview] = useState<ReviewData>(initialReviewState);
    const maxLength = 50;
    const [charCount, setCharCount] = useState<number>(newReview?.reviewcontent?.length ?? 0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string>("");
    const [reviewImg, setReviewImg] = useState<string>("");

    useEffect(() => {
        const formData = new FormData();
        formData.append("originalpostid", String(props.postid));
        
        axios.post("https://gajayeogi.shop/reviewread", formData, {
            withCredentials: true,
        })
        .then((res) => {
            setReviews(res.data);

        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNewReview({ ...newReview, reviewcontent: e.target.value });
        setCharCount(value.length);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setNewReview({ ...newReview, reviewimg: file });  // 수정된 부분
            
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setNewReview({ ...newReview, reviewimg: null });  // 수정된 부분
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("reviewuser", String(session?.user?.email));
        formData.append("reviewusername", String(session?.user?.name));
        formData.append("originalpostid", props.postid);
        formData.append("reviewcontent", newReview.reviewcontent);
        if (newReview.reviewimg) {
            formData.append("reviewimg", newReview.reviewimg);  // 수정된 부분
        }
        axios.post("https://gajayeogi.shop/reviewwrite", formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
            }
        })
        .then((res) => {
            alert("리뷰 등록 성공!");
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            alert("리뷰 등록 실패!");
        });



    };

    const imageClick = (image: string) => {
        setModalMode(true);
        setModalImage(image);
        console.log(image);
    }

    const closeModal = () => {
        setModalMode(false);
        setModalImage("");
    };


    return(
        <>
            <ul className="space-y-4">
                {reviews.map((review) => (
                    <li key={review.reviewid} className="border border-gray-300 p-4 rounded-md">
                        <ReviewBlock review={review} />
                    </li>
                ))}
            </ul>
            {session?.user?.email && session?.user?.email != props.postuser && (
                <>
                    <form onSubmit={handleSubmit} className="mt-12">
                        {/* {imagePreview && (
                            <div className="mt-2">
                                <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-md" />
                                <button type="button" onClick={handleRemoveImage} className="bg-red-500 text-white rounded-sm p-1">
                                    <p className="font-bold">X</p>
                                </button>
                            </div>
                        )}
                        <label htmlFor="image" className="mb-2 block text-lg font-semibold text-gray-800 text-sm">사진 업로드</label>
                        <input 
                            type="file" 
                            name="auctionImages" 
                            id="image" 
                            multiple 
                            onChange={handleImageChange} 
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        /> */}
                        <textarea id="attractionExplain" name="attractionExplain" value={newReview?.reviewcontent} onChange={(e) => handleInputChange(e)} 
                            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                                    charCount > maxLength ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`} />
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
                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    리뷰 추가
                                </button>
                            </div>
                    </form>
                </>
            )}

                    {modalMode && modalImage &&
                        <div>
                            <ImageModal image={modalImage} closeModal={closeModal}/>
                        </div>
                    }
        </>
    );
}

export default Review;