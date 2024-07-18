"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";

const UserAttractionList = () => {
    const [attractionList, setAttractionList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/postallread")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <></>
    );
}

export default UserAttractionList;