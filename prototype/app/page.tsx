"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) router.replace("/welcome");
    else router.replace("/login");
  }, [isLoggedIn, router]);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <p>Načítání…</p>
    </main>
  );
}
