"use client"

import { RecieveAttraction } from "@/app/Type";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserAttractionBlock from "../Attraction/UserAttractionBlock";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ProfileAttractionList = (props: {ids: string[]}) => {
    const [attractionList, setAttractionList] = useState<RecieveAttraction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        if (Array.isArray(props.ids)) {
            const fetchData = async () => {
                let fetchedAttractions: RecieveAttraction[] = [];
                try {
                    const promises = props.ids.map(async (id) => {
                        const res = await axios.get("https://gajayeogi.shop/postread", {
                            params: { postid: id },
                            withCredentials: true,
                        });
                        return res.data;
                    });
    
                    // 모든 요청이 완료된 후에 배열에 추가
                    fetchedAttractions = await Promise.all(promises);
                    setAttractionList(fetchedAttractions);
                } catch (err) {
                    console.log(err);
                }
            };
    
            fetchData();
        }
    }, [props.ids]);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(attractionList.length / itemsPerPage);

    // 현재 페이지의 항목들
    const currentItems = attractionList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return(
        <div>
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

export default ProfileAttractionList