"use server"
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

const isAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return !!session.user;
};

export default isAuth;
