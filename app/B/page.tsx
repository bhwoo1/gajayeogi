import React from "react";
import MenuBar from "../components/layout/MenuBar";

const B:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center p-24">
            <MenuBar />
            <h1>등록 페이지입니다.</h1>
        </main>
    );
}

export default B;