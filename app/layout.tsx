import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import NavBar from "./components/layout/NavBar";
import RecoilContextProvider from "./recoil/RecoilContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "가자여기",
  description: "가자여기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY;

  return (
    <html lang="en">
      <head>
        {/* <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`}
          strategy="beforeInteractive"
        /> */}
        {/* <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}&submodules=geocoder`}
          strategy="beforeInteractive"
        /> */}
        {/* <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=li8s3sk6dv&submodules=geocoder`}
          strategy="beforeInteractive"
        /> */}
        {/* <script type="text/javascript" src={`https://openapi.map.naver.com/openapi/v3/maps.js?clientId=${naverMapApiKey}&submodules=geocoder`}></script> */}
      </head>
      <body className={inter.className}>
        <RecoilContextProvider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </RecoilContextProvider>
      </body>
    </html>
  );
}