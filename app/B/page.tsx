"use client"

import React, { useEffect, useState } from "react";
import MenuBar from "../components/layout/MenuBar";
import Link from "next/link";
import UserAttractionList from "../components/Attraction/UserAttractionList";
import { FaSearch, FaPlusCircle  } from 'react-icons/fa';
import axios from "axios";
import { RecieveAttraction } from "../Type";

const B: React.FC = () => {
    
    return (
        <main className="flex min-h-screen flex-col w-full items-center p-24">
            <MenuBar currentPage={"B"} />
            <UserAttractionList />
        </main>
    );
}

export default B;