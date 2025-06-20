"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { EyeIcon } from "lucide-react";
import Bookmark from "./Bookmark";
import { redirect } from "next/navigation";
import format_number from "../utils/format_number";
import EditSlang from "./EditSlang";
import { get_relative_time } from "@/utils/relative_date";
import { getEmoji, getLanguage } from "@/utils/getCountry";
import { authStore } from "@/store/useAuthStore";

const CustomCard = ({ post }) => {
  const user = authStore((store) => store.user);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    redirect(`/slang/${post.slug}`);
  };
  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Card
      key={post.id}
      className="relative flex flex-col hover:border-primary   backdrop-blur-3xl transition ease-in duration-300"
      onClick={handleClick}
    >
      {user?.id == post.user_id ? (
        <EditSlang slug={post.slug} />
      ) : (
        <Bookmark id={post.id} cls="absolute right-2"/>
      )}

      <CardHeader>
        <CardTitle className="text-2xl font-bold">{post.name}</CardTitle>
        <CardDescription>
          Added by {post.posted_by?.name} &#x2022;{" "}
          {get_relative_time(post.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-primary">{post.explanation}</p>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <div className="flex gap-2 ">
          {getEmoji(post.country)} {getLanguage(post.language)}
        </div>

        <div className="flex gap-2 " onClick={handleButtonClick}>
          <EyeIcon />
          <span>{format_number(post?._count.views)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
