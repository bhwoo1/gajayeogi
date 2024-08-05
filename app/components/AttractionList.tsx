"use client"

import axios from "axios";
import React, { useEffect } from "react";
import { TourAttraction } from "../Type";
import Link from "next/link";

const AttractionList = (props: {attractionArray: TourAttraction[]}) => {
    

    return(
        <div>
            {props.attractionArray?.map((attraction) => (
                <div className="flex flex-col" key={attraction.contentid}>
                    <Link href={`/attraction/${attraction.contentid}`} passHref>
                        <button>{attraction.title}</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default AttractionList;