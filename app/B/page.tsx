import React from "react";
import MenuBar from "../components/layout/MenuBar";
import Link from "next/link";
import UserAttractionList from "../components/UserAttractionList";

const B:React.FC = () => {
    return(
        <main className="flex min-h-screen flex-col items-center p-24">
            <MenuBar currentPage={"B"} />
            {/* <Link href="/registration"><button>등록하기</button></Link>
            <UserAttractionList /> */}
        </main>
    );
}

export default B;