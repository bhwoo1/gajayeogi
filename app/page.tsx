import MenuBar from "./components/layout/MenuBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MenuBar />
      <h1>홈 페이지입니다.</h1>
    </main>
  );
}
