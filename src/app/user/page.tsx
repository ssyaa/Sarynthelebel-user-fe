"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserPage() {
    const router = useRouter();
    const [userData, setUserData] = useState<{ name: string; username: string; email: string } | null>(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const userInfo = localStorage.getItem("userData");

        if (!isLoggedIn || !userInfo) {
            router.replace("/user/login"); // Redirect jika belum login
        } else {
            setUserData(JSON.parse(userInfo)); // Simpan data user ke state
        }
    }, []);

    if (!userData) {
        return null; // Sambil redirect, tidak perlu menampilkan apa pun
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Profil Pengguna</h2>
                <p><strong>Nama:</strong> {userData.name}</p>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
            </div>
        </div>
    );
}
