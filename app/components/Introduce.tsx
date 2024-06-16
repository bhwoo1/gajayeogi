import React from "react";

// 메인 화면에 프로젝트 설명을 적는 곳
const Introduce = () => {

    return(
        <main className="flex min-h-screen flex-col items-center p-24">
            <img src="/gajayeogi.png" alt="logo" width='400' height='200' className="mb-2"/>
            <p>설명 텍스트</p>
        </main>
    );

}

export default Introduce;