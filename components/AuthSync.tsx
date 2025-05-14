"use client";

import { useSession } from "@/lib/auth/auth-client";
import { authStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const AuthSync = () => {
  const session = useSession();
  const setUser = authStore((state) => state.setUser);
  const clearUser = authStore((s) => s.clearUser);

  useEffect(() => {
    if (session.data?.user) {
      setUser(session.data?.user);
    } else {
      clearUser();
    }
  }, [session, setUser]);
  return null;
};
export default AuthSync;
