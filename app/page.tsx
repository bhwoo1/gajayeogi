import Geolocation from "./components/Geolocation";
import Introduce from "./components/Introduce";
import MenuBar from "./components/layout/MenuBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <MenuBar />
      <Geolocation />
      <Introduce />
    </main>
  );
}
