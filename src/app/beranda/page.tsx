"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import AvailableProducts from "../components/AvailableProducts";
import RestockedSection from "../components/RestockedSection";
import Pagination from "../components/Pagination";
import { Product } from "../lib/types/Product";
import Footer from "../components/Footer"


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const availableProducts = products.filter(p => p.stock > 0);
  const restockedProducts = products.filter(p => p.stock === 0);
  

  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      <AvailableProducts products={availableProducts} />
      <RestockedSection products={restockedProducts} />
      <Footer />
    </>
  );
}