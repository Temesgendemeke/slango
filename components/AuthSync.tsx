"use client";
import { useSession } from "@/lib/auth/auth-client";
import { authStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const AuthSync = () => {
  const session = useSession();
  const setUser = authStore((state) => state.setUser);
  const clearUser = authStore((state) => state.clearUser);

  useEffect(() => {
    const fetchImage = async (id: string): Promise<string | undefined> => {
      const res = await fetch(`/api/user/image/${id}`);

      if (!res.ok) {
        return undefined;
      }

      const data = await res.json();      
      return data.url;
    };

    const syncUser = async () => {
      if (session.data?.user) {
        const image = await fetchImage(session.data.user.id);
        setUser({ ...session.data.user, image });
      } else {
        clearUser();
      }
    };

    syncUser();
  }, [session, clearUser, setUser]);

  return null;
};

export default AuthSync;
