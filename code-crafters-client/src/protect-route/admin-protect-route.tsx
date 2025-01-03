import useAuthStore from "@/store/auth-store.tsx";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {RoleInApp} from "@/interfaces";
import axiosInstance from "@/utils/axios.ts";

type Props = {
  children: React.ReactNode;
};

//-----------------------------------------------------------------------------------------------

export default function AdminProtect({children}: Props) {
  const {isAuthenticated, tokens, user} = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  if (tokens?.access_token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${tokens?.access_token}`;
  }

  useEffect(() => {
    // Wait for auth data to be loaded from localStorage
    const checkAuth = setTimeout(() => {
      if (!isAuthenticated || (pathname && !pathname.startsWith("/admin")) || (user?.role && user.role !== RoleInApp.ADMIN)) {
        router.replace('/home');
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(checkAuth);
  }, [isAuthenticated, pathname, router, user]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
