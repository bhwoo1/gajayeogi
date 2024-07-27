"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image"
import { RecieveAttraction } from "../Type";
import Link from "next/link";



const UserAttractionList = () => {
    const [attractionList, setAttractionList] = useState<RecieveAttraction[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/postallread")
        .then((res) => {
            setAttractionList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <div>
            {attractionList.map((attraction) => (
                <div className="flex flex-row">
                    <Link href={`/attraction/${attraction.postid}`} key={attraction.postid} passHref>
                        <button>{attraction.posttitle}</button>
                    </Link>
                </div>
          ))}
        </div>
    );
}

export default UserAttractionList;