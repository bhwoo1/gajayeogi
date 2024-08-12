import { bestToggleAtom } from "@/app/recoil/RecoilContext";
import React from "react";
import { useRecoilState } from "recoil";


const BestToggleSwitch = () => {
    const [bestMode, setBestMode] = useRecoilState<boolean>(bestToggleAtom);

    return(
        <div className={`flex flex-row items-center space-x-2`}>
            <p className={`font-bold`}>전체</p>
            <input
                type="checkbox"
                className="hidden"
                checked={bestMode}
                onChange={() => setBestMode(!bestMode)}
                id="colorToggleSwitch"
            />
            <label
                htmlFor="colorToggleSwitch"
                className={`relative cursor-pointer w-12 h-6  rounded-full p-1 ${bestMode ? "bg-gray-500" : "bg-gray-300"}`}
            >
                <span
                className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    bestMode ? "translate-x-5 -translate-y-0.5" : " -translate-y-0.5"
                  }`}
                ></span>
            </label>
            <p className={`font-bold`}>Best</p>
        </div>
    );
}

export default BestToggleSwitch;