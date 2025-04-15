// src/app/page.tsx
import Beranda from "./beranda/page";
import Navbar from "../../src/app/components/Navbar";
import { CartProvider } from "../context/Contextcart"; // Import CartProvider

export default function HomePage() {
  return (
    <CartProvider>
      {/* Navbar harus diletakkan di luar komponen beranda agar tetap muncul di setiap halaman */}
      <Navbar />
      <Beranda />
    </CartProvider>
  );
}
