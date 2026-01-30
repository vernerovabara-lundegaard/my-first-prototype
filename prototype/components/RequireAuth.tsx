"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;
  return <>{children}</>;
}
