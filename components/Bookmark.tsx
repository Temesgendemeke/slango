"use client";
import headers from "@/constants/headers";
import { authStore } from "@/store/useAuthStore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon } from "lucide-react";
import useBookmark from "@/store/useBookmark";

interface BookmarkProps {
  id: string;
}

const Bookmark = ({ id }: BookmarkProps) => {
  const user = authStore((store) => store.user);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isBookmarked = useBookmark((store) => store.isBookmarked);
  const addBookmark = useBookmark((store) => store.addBookmark);
  const removeBookmark = useBookmark((store) => store.removeBookmark);

  const postBookmark = async (user_id, post_id) => {
    fetch(`/api/user/bookmark`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user_id, post_id }),
    });

    if (isBookmarked(post_id)) {
      removeBookmark(post_id);
    } else {
      addBookmark(post_id);
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (!user) router.push("/login");
    await postBookmark(user?.id, id);
  };

  return (
    <div
      className="absolute right-2 cursor-pointer "
      onClick={handleBookmark}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isBookmarked(id) || isHovered ? (
        <HeartIcon color="white" fill="red" />
      ) : (
        <HeartIcon />
      )}
    </div>
  );
};

export default Bookmark;
