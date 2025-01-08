import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cong from "./components/Cong";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Cong />
      </main>
      <Footer />
    </div>
  );
}
