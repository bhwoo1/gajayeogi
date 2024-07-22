"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image"

type ReceveAttraction = {
    location: string,
    postcontent: string,
    postid: string,
    postimgurl: string[],
    posttitle: string,
    postuser: string,
    postusername: string,
    xpoint: string,
    ypoint: string
}

const UserAttractionList = () => {
    const [attractionList, setAttractionList] = useState<ReceveAttraction[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/postallread")
        .then((res) => {
            console.log(res);
            setAttractionList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <div>
            {attractionList.map((attraction) => (
                <p>{attraction.posttitle}</p>
          ))}
        </div>
    );
}

export default UserAttractionList;