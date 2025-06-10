"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, HeartIcon, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import avater from "@/assets/avater.png";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/useAuthStore";

const Account = () => {
  const router = useRouter();
  const user = authStore((store) => store.user);

  const handleClick = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (_) {
      toast.error("Error during sign out. Please try again.");
    }
  };
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="shadow">
            <AvatarImage src={user.image || avater.src} />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 absolute -right-4">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push(`/user/${user.id}`)}>
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/user/bookmark`)}
            >
              <HeartIcon />
              <span>bookmarks</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/account/setting")}>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              window.open("https://github.com/Temesgendemeke/slango", "_blank")
            }
          >
            <Github />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleClick}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Account;
