import React from "react";
import MenuBar from "../components/layout/MenuBar";

const A:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <MenuBar />
            <h1>A 페이지입니다.</h1>
        </main>
    );
}

export default A;