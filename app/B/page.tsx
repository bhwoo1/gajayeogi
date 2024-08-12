"use client"

import React, { useEffect, useState } from "react";
import MenuBar from "../components/layout/MenuBar";
import UserAttractionList from "../components/Attraction/UserAttractionList";
import BestToggleSwitch from "../components/Attraction/BestToggleSwitch";
import PlusButton from "../components/Attraction/PlusButton";

const B: React.FC = () => {
    
    return (
        <main className="flex min-h-screen flex-col w-full items-center p-24">
            <MenuBar currentPage={"B"} />
            <div className="flex flex-row justify-between items-center mb-4 space-x-4">
                <PlusButton />
                <BestToggleSwitch />
            </div>
            <UserAttractionList />
        </main>
    );
}

export default B;