"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import CustomCard from "@/components/CustomCard";
import { authStore } from "@/store/useAuthStore";
import avater from "@/assets/avater.png";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserProfileSkeleton from "@/components/skeleton/userProfileSkeleton";
import Footer from "@/components/Footer";

const UserProfile = ({ user }) => {
  return (
    <>
      <div className="flex flex-col gap-4  items-center mt-10">
          <div>
            <div className="relative rounded-full overflow-hidden w-62 h-62">
              <Image
                alt="user avater"
                src={user?.image?.url || avater}
                className="object-cover w-full h-full"
                width={260}
                height={260}
              />
            </div>
            <h4 className="text-center text-2xl  font-bold mt-4">
              {user?.name}
            </h4>
          </div>
          <div className="flex gap-5 text-center">
            <div>
              <p className="font-bold">{user?._count.posts || 0}</p>
              <p>posts</p>
            </div>

            <div>
              <p className="font-bold">{user?._count.views || 0}</p>
              <p>views</p>
            </div>

            <div>
              <p className="font-bold">{user?._count.bookmarked_by || 0}</p>
              <p>bookmark</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full mt-10">
            {user?.posts.map((item, index) => (
              <CustomCard key={index} item={item} />
            ))}
          </div>
        </div>
    </>
  );
};

export default UserProfile;
