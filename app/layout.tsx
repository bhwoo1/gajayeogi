import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import NavBar from "./components/layout/NavBar";
import RecoilContextProvider from "./recoil/RecoilContext";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "가자여기",
  description: "가자여기",
  icons : {
    icon: "/gajayeogi_small_white_bg.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
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