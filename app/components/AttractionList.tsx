"use client"

import axios from "axios";
import React, { useEffect } from "react";

const AttractionList = () => {
    useEffect(() => {
        axios.get("http://localhost:8080/info")
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    return(
        <>
        
        </>
    );
}

export default AttractionList;