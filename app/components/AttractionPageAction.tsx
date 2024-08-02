import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp  } from "react-icons/fa6";

type Props = {
    postid: string,
    postuser: string
}

const AttractionPageAction = (prop: Props) => {
    const {data: session, status: sessionStatus} = useSession();
    const [suggested, setSuggested] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        if(session?.user?.email) {
            const fetchScrap = async () => {
                    const formData = new FormData();
                    formData.append("user", String(session?.user?.email));
                    await axios.post("http://localhost:8080/readuser", formData, {
                        withCredentials: true
                    })
                    .then((res) => {
                        const scrapIds = res.data.scrapids;
                        scrapIds.forEach((scrapid: string) => {
                            if (scrapid === String(prop.postid)) {
                                setSuggested(true);
                                console.log("스크랩 확인!");
                            }
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            };
            fetchScrap();
        }
        else {
            console.log("작동불가");
        }

    }, []);

    const suggestClick = () => {
        const formData = new FormData();
        formData.append("postid", String(prop.postid));
        formData.append("postuser", String(prop.postuser));
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
        formData.append("postid", String(prop.postid));
        formData.append("postuser", String(prop.postuser));
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

    return(
        <>
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
        </>
    );

}

export default AttractionPageAction;