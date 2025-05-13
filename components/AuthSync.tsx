"use client";

import { useSession } from "@/lib/auth/auth-client";
import { authStore } from "@/store/useAuthStore";
import React, { useEffect } from "react";

const AuthSync = () => {
  const sesstion = useSession();
  const setUser = authStore((state) => state.setUser);

  useEffect(() => {
    if (sesstion.data?.user) {
      setUser(sesstion.data?.user);
    }
  }, [sesstion, setUser]);
  return null;
};

export default AuthSync;
