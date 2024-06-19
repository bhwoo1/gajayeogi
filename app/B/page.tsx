import React from "react";
import MenuBar from "../components/layout/MenuBar";
import Link from "next/link";

const B:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center p-24">
            <MenuBar />
            <Link href="/registration"><button>등록하기</button></Link>
        </main>
    );
}

export default B;