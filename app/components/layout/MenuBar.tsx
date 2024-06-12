"use client"

import React from "react";
import "./MenuBar.css";

const MenuBar:React.FC = () => {
    return(
        <div className="w-full h-full p-4 flex flex-row justify-start">
            <div className="pr-24 "><p className="hoverable-link text-xl">홈</p></div>
            <div className="pr-24 "><p className="hoverable-link text-xl">어쩌구</p></div>
            <div className="pr-24 "><p className="hoverable-link text-xl">저쩌구</p></div>
        </div>
    );
}

export default MenuBar;