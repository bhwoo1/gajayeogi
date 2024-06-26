"use client"

import { RecoilRoot, atom } from "recoil";
import { Location } from "../Type";

// 사용자의 현재 위치
export const UserLocationAtom = atom<Location>({
    key: "UserLocationState",
    default: {
        latitude: 37.5665, // 위도
        longitude: 126.9780 // 경도
        // default: 서울시청 좌표
    }
});

// 사용자가 선택한 위치 좌표
export const selectedLocationAtom = atom<Location>({
    key: "SelectedLocationState",
    default: {
        latitude: 0.0, // 위도
        longitude: 0.0 // 경도
    }
});

// 사용자가 선택한 위치 주소
export const selectedAddressAtom = atom({
    key: "SelectedAddressState",
    default: ""
});

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
};