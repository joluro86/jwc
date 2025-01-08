import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Importa tu Navbar
import Footer from "./components/Footer"; // Importa tu Footer



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex flex-col gap-8 items-center sm:items-start">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

