"use client"

// pages/cart/checkout.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../../lib/types/Product";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex h-screen bg-white font-inter">
      {/* LEFT EMPTY SIDE */}
      <div className="flex-1"></div>

      {/* RIGHT SIDE */}
      <div className="w-[400px] bg-gray-100 p-6 flex flex-col gap-6">
        <h1 className="text-xl font-bold text-black">Check out</h1>

        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 relative">
            {/* IMAGE + BADGE */}
            <div className="relative">
              <img
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              {item.quantity > 1 && (
                <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.quantity}
                </span>
              )}
            </div>

            {/* NAME */}
            <div className="text-sm font-semibold text-black">{item.name}</div>
          </div>
        ))}

        {/* DISCOUNT INPUT */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Discount"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
          <button className="bg-gray-300 text-black text-sm px-4 rounded hover:bg-gray-400 transition">
            Apply
          </button>
        </div>

        {/* SUBTOTAL & TOTAL */}
        <div className="text-sm text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>SUBTOTAL</span>
            <span>Rp {totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>SHIPPING</span>
            <span>Rp 0</span>
          </div>
        </div>

        <hr />

        {/* TOTAL */}
        <div className="flex justify-between font-semibold text-black text-base">
          <span>TOTAL</span>
          <span>Rp {totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
