"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

axios.defaults.withCredentials = true;

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Step 1: Dapatkan CSRF token
            await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                withCredentials: true,
            });

            // Step 2: Login
            await axios.post("http://localhost:8000/login", {
                email,
                password,
            }, {
                withCredentials: true,
            });

            // Optional: ambil user info (buat verifikasi atau simpan state)
            // const res = await axios.get("http://localhost:8000/api/user", {
            //     withCredentials: true,
            // });

            router.push("/dashboard"); // redirect setelah login
        } catch (err: any) {
            setError(err.response?.data?.message || "Login gagal.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                </form>
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <p className="text-center text-gray-700">
                    Belum memiliki akun?{" "}
                    <Link href="/user/register" className="text-blue-500 hover:underline">Buat akun</Link>
                </p>
            </div>
        </div>
    );
}
