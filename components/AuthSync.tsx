"use client";

import { useSession } from "@/lib/auth/auth-client";
import { authStore } from "@/store/useAuthStore";
import { useEffect } from "react";

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
