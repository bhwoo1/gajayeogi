"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { RecieveAttraction } from "../../Type";
import Link from "next/link";
import UserAttractionBlock from "./UserAttractionBlock";
import { GrFormPrevious, GrFormNext  } from "react-icons/gr";

const UserAttractionList = () => {
    const [attractionList, setAttractionList] = useState<RecieveAttraction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        axios.get("http://localhost:8080/postallread")
        .then((res) => {
            setAttractionList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // Calculate the total number of pages
    const totalPages = Math.ceil(attractionList.length / itemsPerPage);

    // Slice the list for the current page
    const currentItems = attractionList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="w-full">
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