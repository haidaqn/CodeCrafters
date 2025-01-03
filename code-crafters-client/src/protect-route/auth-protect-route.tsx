import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import useAuthStore from "@/store/auth-store.tsx";
import axiosInstance from "@/utils/axios.ts";

type Props = {
  children: React.ReactNode;
};

export default function AuthProtect({children}: Props) {
  const {isAuthenticated, setAuthLoaded, isAuthLoaded, tokens} = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setAuthLoaded();
  }, [setAuthLoaded]);

  useEffect(() => {
    if (!pathname) return;

    if (tokens?.access_token) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${tokens?.access_token}`;
    }

    if (isAuthenticated && pathname.startsWith("/auth")) {
      router.replace("/home");
    }
    if (!isAuthenticated && !pathname.startsWith("/auth")) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, isAuthLoaded, router, pathname]);

  if (!isAuthLoaded) return null;

  return <>{children}</>;
}
