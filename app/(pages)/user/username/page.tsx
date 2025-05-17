import React from "react";
import Image from "next/image";
import avater from "../../../assets/Rapper=fiftycent.png";
import CustomCard from "@/components/CustomCard";
import { Edit, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authStore } from "@/store/useAuthStore";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/${params.id}`
  );
  if (!res) return redirect("/not-found");
  const user = await res.json();

  // if (!res.ok) return router.push("/not-found");
  // const slang = await res.json();
  // const auth_user = authStore((state) => state.user);

  return (
    <div className="flex flex-col gap-4  items-center mt-10">
      <p>{JSON.stringify(user)}</p>

      {/* <div>
        <div className="relative">
          <Image
            alt="user avater"
            src={avater}
            className="rounded-full border border-primary p-4"
          />
          {auth_user && (
            <Label>
              <Upload
                className="absolute bottom-5 right-5"
              />
              <Input type="file" className="hidden" />
            </Label>
          )}
        </div>
        <h4 className="text-center text-2xl  font-bold mt-4">
          {slang.posted_by.name}
        </h4>
      </div>
      <div className="flex gap-5 text-center">
        <div>
          <p className="font-bold">{user.post}</p>
          <p>posts</p>
        </div>

        <div>
          <p className="font-bold">{user.view}</p>
          <p>views</p>
        </div>

        <div>
          <p className="font-bold">{user.like}</p>
          <p>likes</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {slang.map((item, index) => (
          <CustomCard key={index} item={item} setSlang={setSlang} />
        ))}
      </div> */}
    </div>
  );
};

export default page;
