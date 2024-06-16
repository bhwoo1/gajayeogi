"use client"

import { RecoilRoot, atom } from "recoil";

// 페이지
export const PageAtom = atom({
    key: "PageState",
    default: "home"
});

// 사용자의 현재 위치
export const UserLocationAtom = atom({
    key: "UserLocationState",
    default: {
        latitude: 37.5665, // 위도
        longitude: 126.9780 // 경도
        // default: 서울시청 좌표
    }
});

// 사용자가 선택한 위치
export const selectedLocationAtom = atom({
    key: "SelectedLocationState",
    default: {
        latitude: 0.0, // 위도
        longitude: 0.0 // 경도
    }
})

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
};