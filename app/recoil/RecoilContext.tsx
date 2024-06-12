"use client"

import { RecoilRoot, atom } from "recoil";

export const PageAtom = atom({
    key: "PageState",
    default: "home"
});

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
};