import React, { useState } from "react";
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
import { authStore } from "@/store/useAuthStore";
import EditSlang from "./EditSlang";
import { get_relative_time } from "@/utils/relative_date";
import { getEmoji, getLanguage } from "@/utils/getCountry";
import { usePostStore } from "@/store/usePostStore";

const CustomCard = ({ item }) => {
  const user = authStore((store) => store.user);
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    redirect(`/slang/${item.slug}`);
  };
  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleBookmark = async () => {};

  return (
    <Card
      key={item.id}
      className="relative flex flex-col hover:border-primary   backdrop-blur-3xl transition ease-in duration-300"
      onClick={handleClick}
    >
      {user?.id == item.user_id ? (
        <EditSlang slug={item.slug} />
      ) : (
        <Bookmark
          id={item.id}
          isBookmarked={true}
          onClick={handleBookmark}
        />
      )}

      <CardHeader>
        <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
        <CardDescription>
          Added by {item.posted_by?.name} &#x2022;{" "}
          {get_relative_time(item.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-primary">{item.explanation}</p>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <div className="flex gap-2 ">
          {getEmoji(item.country)} {getLanguage(item.language)}
        </div>

        <div className="flex gap-2 " onClick={handleButtonClick}>
          <EyeIcon />
          <span>{format_number(item._count.views)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
