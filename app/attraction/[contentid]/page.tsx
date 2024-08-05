import MenuBar from "@/app/components/layout/MenuBar";
import React from "react";


const AttractionPage = (props: {params: {contentid: string}}) => {
    return(
        <main className="flex min-h-screen flex-col p-24">
            <MenuBar currentPage={"A"} />
            <h1>{props.params.contentid} Page</h1>
        </main>
    );
}


export default AttractionPage;