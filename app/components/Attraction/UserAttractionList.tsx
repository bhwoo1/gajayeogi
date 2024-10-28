"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { areas, RecieveAttraction } from "../../Type";
import Link from "next/link";
import UserAttractionBlock from "./UserAttractionBlock";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaSearch } from 'react-icons/fa';
import { useRecoilValue } from "recoil";
import { bestToggleAtom } from "@/app/recoil/RecoilContext";

const UserAttractionList = () => {
    const [attractionList, setAttractionList] = useState<RecieveAttraction[]>([]);
    const [bestAttractionList, setBestAttractionList] = useState<RecieveAttraction[]>([]);
    const [optionValue, setOptionValue] = useState<string>("recent");
    const [searchOptionValue, setSearchOptionValue] = useState<string>("title");
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [selectedSubArea, setSelectedSubArea] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const bestMode = useRecoilValue(bestToggleAtom);
    const itemsPerPage = 4;

    useEffect(() => {
        axios.get("http://localhost:8080/postallread")
            .then((res) => {
                const reversedList: RecieveAttraction[] = res.data.reverse();
                setAttractionList(reversedList);

                // suggest가 5 이상인 경우만 필터링하여 bestAttractionList에 저장
                const bestAttractions = reversedList.filter((item: RecieveAttraction) => Number(item.suggest) >= 1);
                setBestAttractionList(bestAttractions);

                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // bestMode가 변경될 때마다 리스트를 업데이트
    useEffect(() => {
        setCurrentPage(1); // bestMode가 변경될 때 페이지를 첫 페이지로 초기화
    }, [bestMode]);

    // bestMode에 따라 적절한 리스트 선택
    const listToShow = bestMode ? bestAttractionList : attractionList;

    // 옵션에 따라 리스트 정렬 및 필터링
    const sortedAndFilteredItems = listToShow
        .filter((attraction) => {
            if (optionValue === 'area' && selectedArea && selectedSubArea) {
                const [locationArea, locationSubArea] = attraction.postlocation.split(' ');
                return locationArea === selectedArea && locationSubArea === selectedSubArea;
            }
            return true;
        })
        .sort((a, b) => {
            if (optionValue === 'recent') {
                return 0; // 역순이 기본 정렬이므로 추가 정렬이 필요 없음
            }
            if (optionValue === 'ganada') {
                return a.posttitle.localeCompare(b.posttitle, 'ko');
            }
            return 0;
        });

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(sortedAndFilteredItems.length / itemsPerPage);

    // 현재 페이지의 항목들
    const currentItems = sortedAndFilteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleOptionChange = (value: string) => {
        setOptionValue(value);
        setCurrentPage(1); // 옵션 변경 시 페이지를 첫 페이지로 초기화
        if (value !== 'area') {
            setSelectedArea('');
            setSelectedSubArea('');
        }
    };

    const handleAreaChange = (area: string) => {
        setSelectedArea(area);
        setSelectedSubArea(''); // 지역이 바뀔 때 기초자치단체 초기화
    };

    const handleSubAreaChange = (subArea: string) => {
        setSelectedSubArea(subArea);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword === "") {
            alert('검색할 내용을 입력해주세요');
            return;
        }

        const searchUrl = searchOptionValue === "title" ? "postsearch" : "postsearch";
        const searchParams = searchOptionValue === "title" ? { posttitle: keyword } : { postusername: keyword };

        axios.get(`http://117.52.84.144:8080/${searchUrl}`, {
            params: searchParams,
            withCredentials: true
        })
            .then((res) => {
                if (res.data.length === 0) {
                    alert('검색 결과가 존재하지 않습니다.');
                    return;
                }
                
                const reversedList: RecieveAttraction[] = res.data.reverse();
                setAttractionList(reversedList);

                const bestAttractions = reversedList.filter((item: RecieveAttraction) => Number(item.suggest) >= 5);
                setBestAttractionList(bestAttractions);
            })
            .catch((err) => {
                console.log(err);
                alert('검색 실패');
            });
    }

    const handleSearchOptionChange = (value: string) => {
        setSearchOptionValue(value);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    return (
        <div className="w-full">
            <div className="w-full max-w-5xl mx-auto mb-4">
                <form onSubmit={handleSubmit} className="w-full border p-2 rounded-lg bg-gray-100 flex flex-row">
                    <select className="bg-gray-100 mr-2" onChange={(e) => handleSearchOptionChange(e.target.value)}>
                        <option value="title">제목</option>
                        <option value="user">작성자</option>
                    </select>
                    <input
                        type="text"
                        className="w-full bg-gray-100 focus:outline-none"
                        placeholder="검색할 내용을 입력해주세요."
                        value={keyword}
                        onChange={handleInputChange}
                    />
                    <button className="p-2"><FaSearch /></button>
                </form>
            </div>
            <div className="flex flex-row items-center mb-4">
                <select className="text-gray-500 text-sm" onChange={(e) => handleOptionChange(e.target.value)}>
                    <option value="recent">최신순</option>
                    <option value="ganada">가나다</option>
                    <option value="area">지역별</option>
                </select>
                {optionValue === 'area' && (
                    <select
                        className="text-gray-500 text-sm ml-2"
                        onChange={(e) => handleAreaChange(e.target.value)}
                        value={selectedArea}
                    >
                        <option value="" disabled>광역자치단체</option>
                        {Object.keys(areas).map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                )}

                {selectedArea && (
                    <select
                        className="text-gray-500 text-sm ml-2"
                        onChange={(e) => handleSubAreaChange(e.target.value)}
                        value={selectedSubArea}
                    >
                        <option value="" disabled>기초자치단체</option>
                        {areas[selectedArea].map(subArea => (
                            <option key={subArea} value={subArea}>{subArea}</option>
                        ))}
                    </select>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentItems.map((attraction) => (
                    <div key={attraction.postid}>
                        <Link href={`/attraction/user/${attraction.postid}`} passHref>
                            <UserAttractionBlock attractionData={attraction} />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    <GrFormPrevious />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg ${currentPage === pageNumber ? 'text-black' : 'bg-gray-200 text-gray-600'} hover:bg-gray-200`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    <GrFormNext />
                </button>
            </div>
        </div>
    );
}

export default UserAttractionList;