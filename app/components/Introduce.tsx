import React from "react";

// 메인 화면에 프로젝트 설명을 적는 곳
const Introduce = () => {

    return(
        <main className="flex flex-col items-center p-24">
            <img src="/gajayeogi.png" alt="logo" width='400' height='200' className="mb-2"/>
            <p className="text-xl text-gray-800 font-semibold text-center">당신만이 알고 있는 비밀장소, 이제 다른 사람들과 공유해보세요!</p>
        </main>
    );

}

export default Introduce;