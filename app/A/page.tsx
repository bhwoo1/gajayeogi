"use client"

import React from "react";
import MenuBar from "../components/layout/MenuBar";
import NaverMap from "../components/NaverMap";
import Search from "../components/Search";

const A:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <MenuBar currentPage={"A"} />
            <Search />
            <NaverMap />
        </main>
    );
}

export default A;