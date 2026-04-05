"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const PUBLIC_PAGES = ["/", "/account", "/account/login", "/account/register"];

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!PUBLIC_PAGES.includes(pathname) && !user) {
        router.replace("/account");
      }
    }
  }, [user, loading, pathname, router]);

  if (!PUBLIC_PAGES.includes(pathname) && (!user || loading)) return null;

  return <>{children}</>;
}
