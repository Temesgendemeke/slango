import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { EyeIcon, ThumbsUp } from "lucide-react";
import Bookmark from "./Bookmark";
import { redirect } from "next/navigation";
import format_number from "../utils/format_number";
import { authStore } from "@/store/useAuthStore";
import EditSlang from "./EditSlang";
import { get_relative_time } from "@/utils/relative_date";
import headers from "@/constants/headers";

const CustomCard = ({ item, setSlang }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    redirect(`/slang/${item.slug}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const user = authStore((store) => store.user);

  const like = async () => {
    const data = {
      slang_id: item.id,
      user_id: user.id,
    };
    //  how to implement
    await fetch("/slang/like", {
      method: "POST",
      headers,
      body: data,
    });
  };

  return (
    <Card
      key={item.id}
      className="relative flex flex-col hover:bg-secondary transition ease-in duration-300"
      onClick={handleClick}
    >
      {user?.id == item.user_id ? (
        <EditSlang />
      ) : (
        <Bookmark
          id={item.id}
          isBookmarked={true}
          setSlang={setSlang}
          onClick={handleButtonClick}
        />
      )}

      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>
          Added by {item.posted_by?.name} &#x2022;{" "}
          {get_relative_time(item.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{item.explanation}</p>
        {/* <p className="p-2 mt-2">{`${item.examples[0]}`}</p> */}
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <div className="flex gap-2 " onClick={handleButtonClick}>
          <ThumbsUp />
          <span>{format_number(item.like_count)}</span>
        </div>

        <div className="flex gap-2 " onClick={handleButtonClick}>
          <EyeIcon />
          <span>{format_number(item.view)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
