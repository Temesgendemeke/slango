import EmailVerification from "@/components/EmailVerification";
import { Suspense } from "react";
export const metadata = {
  title: "verifiy your email",
};

export default async function Page() {
  return (
    <Suspense>
      {" "}
      <EmailVerification />
    </Suspense>
  );
}
