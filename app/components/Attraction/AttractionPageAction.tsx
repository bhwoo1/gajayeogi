"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp  } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { TbShoe, TbShoeOff  } from "react-icons/tb";

type Props = {
    postid: string,
    postuser: string,
    suggest: number
}

const AttractionPageAction = (prop: Props) => {
    const {data: session, status: sessionStatus} = useSession();
    const [suggested, setSuggested] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [visited, setVisited] = useState<boolean>(false);
    const router = useRouter();

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
        });
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
        });
    };

    const visitClick = () => {
        const formData = new FormData();
        formData.append("reviewid", String(prop.postid));
        formData.append("reivewuser", String(prop.postuser));
        axios.post("http://localhost:8080/visitcount", formData,  {
            withCredentials: true,
        })
        .then((res) => {
            alert("이 장소에 방문하셨습니다!");
            setVisited(true);
        })
        .catch((err) => {
            console.log(err);
            alert("추천에 실패하였습니다.");
        });
    };

    const unvisitClick = () => {
        const formData = new FormData();
        formData.append("reviewid", String(prop.postid));
        formData.append("reviewuser", String(prop.postuser));
        axios.post("http://localhost:8080/visituncount", formData, {
            withCredentials: true,
        })
        .then((res) => {
            alert("이 장소를 방문 취소하셨습니다!");
            setSuggested(false);
        })
        .catch((err) => {
            console.log(err);
            alert("방문 취소에 실패하였습니다.");
        })
    }

    const attractionDelete = () => {
        if(prop.postuser != session?.user?.email) {
            alert("잘못된 요청입니다.");
            return;
        }


        axios.delete("http://localhost:8080/postdelete", {
            params: {
                postid: prop.postid,
                postuser: session?.user.email
            },
            withCredentials: true
        })
        .then((res) => {
            alert('삭제하였습니다.');
            router.push("/B");
        })
        .catch((err) => {
            console.log(err);
            alert("삭제하지 못했습니다.");
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };



    return(
        <>
            {prop.postuser === session?.user?.email ? (
                <>
                    <div className="flex flex-row">
                        <p className="ml-24 mr-2 text-5xl text-gray-600 cursor-pointer" 
                            onClick={attractionDelete}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                                <MdDeleteForever />
                        </p>
                        <div className={`flex items-center bg-gray-600 rounded-full px-3 py-1 mt-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="text-white text-sm font-bold">삭제하시겠습니까?</span>
                        </div>
                    </div>
                </>
            ) : (
                <> 
                    {prop.suggest >= 5 ? 
                            <>
                                {visited ? 
                                    <div className="flex flex-row">
                                        <p className="ml-24 mr-2 text-5xl text-gray-600 cursor-pointer" 
                                            onClick={unvisitClick}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}>
                                                <TbShoeOff />
                                        </p>
                                        <div className={`flex items-center bg-gray-600 rounded-full px-3 py-1 mt-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                            <span className="text-white text-sm font-bold">어라? 방문한 곳이 아닌가요?</span>
                                        </div>
                                    </div>
                                :
                                    <div className="flex flex-row">
                                        <p className="ml-24 mr-2 text-5xl text-gray-600 cursor-pointer" 
                                            onClick={visitClick}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}>
                                                <TbShoe />
                                        </p>
                                        <div className={`flex items-center bg-gray-600 rounded-full px-3 py-1 mt-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                            <span className="text-white text-sm font-bold">방문하셨나요?</span>
                                        </div>
                                    </div>
                                }
                            </>
                        :
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
                    }   
                </>
            )}
            
        </>
    );

}

export default AttractionPageAction;