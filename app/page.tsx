import Script from "next/script";
import MenuBar from "./components/layout/MenuBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MenuBar />
      {/* <Script strategy='beforeInteractive' src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVERMAP_CLIENT_ID}`} /> */}
      <h1>홈 페이지입니다.</h1>
    </main>
  );
}
