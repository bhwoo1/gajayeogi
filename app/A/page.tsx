"use client"

import React from "react";
import MenuBar from "../components/layout/MenuBar";
import NaverMap from "../components/NaverMap";
import Search from "../components/Search";
// import AttractionList from "../components/AttractionList";

const A:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center p-24">
            <MenuBar currentPage={"A"} />
            <Search />
            <NaverMap />
            {/* <AttractionList /> */}
        </main>
    );
}

export default A;