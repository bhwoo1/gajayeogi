import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import NavBar from "./components/layout/NavBar";
import RecoilContextProvider from "./recoil/RecoilContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`}
          strategy="beforeInteractive"
        />
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}&submodules=geocoder`}
          strategy="beforeInteractive"
        />
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