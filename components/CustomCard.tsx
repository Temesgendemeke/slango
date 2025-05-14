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
import { EllipsisVertical } from "lucide-react";
import EditSlang from "./EditSlang";

const CustomCard = ({ item, setSlang }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    redirect("/slang");
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const user = authStore((store) => store.user);

  return (
    <Card
      key={item.id}
      className="relative flex flex-col hover:bg-secondary transition ease-in duration-300"
      onClick={handleClick}
    >
      {user ? (
        <EditSlang />
      ) : (
        <Bookmark
          id={item.id}
          isBookmarked={item.bookmarked}
          setSlang={setSlang}
          onClick={handleButtonClick}
        />
      )}

      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>
          Added by {item.author} &#x2022; {item.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{item.example}</p>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <div className="flex gap-2 " onClick={handleButtonClick}>
          <ThumbsUp />
          <span>{format_number(4000000)}</span>
        </div>

        <div className="flex gap-2 " onClick={handleButtonClick}>
          <EyeIcon />
          <span>{format_number(4343)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
