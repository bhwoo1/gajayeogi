"use client"

import { RecoilRoot, atom } from "recoil";
import { Location, TourAttraction } from "../Type";

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
        latitude: 37.5665, // 위도
        longitude: 126.9780 // 경도
    }
});

// 사용자가 선택한 위치 주소
export const selectedAddressAtom = atom({
    key: "SelectedAddressState",
    default: ""
});

export const selectedUserAtom = atom({
    key: "SelectedUserState",
    default: ""
})

export const selectedAttractionAtom = atom<TourAttraction>({
    key: "SelectedAttractionState",
    default: {
        addr1: "",
        addr2: "",
        areacode: "",
        booktour: "",
        cat1: "",
        cat2: "",
        cat3: "",
        contentid: "",
        contenttypeid: "",
        cpyrhtDivCd: "",
        createdtime: "",
        dist: "",
        firstimage: "",
        firstimage2: "",
        mapx: "",
        mapy: "",
        mlevel: "",
        modifiedtime: "",
        sigungucode: "",
        tel: "",
        title: ""
    }
});

export const bestToggleAtom = atom<boolean>({
    key: "bestToggleState",
    default: false
})

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
};