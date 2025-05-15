"use client";
import GoBack from "@/components/GoBack";
import { Button } from "@/components/ui/button";
import { Calendar, EyeIcon, ThumbsUp, User } from "lucide-react";
import { redirect, useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import format_number from "@/utils/format_number";
import { Item } from "@radix-ui/react-dropdown-menu";

const page = () => {
  // const [slang, setSlang] = useState({
  //   id: 4,
  //   name: "vibe check",
  //   explanation:
  //     "A spontaneous check to see if someone is acting right or the mood is good.",
  //   example: "He failed the vibe check when he started yelling at the waiter.",
  //   date: "2024-12-10",
  //   author: "queenofslang",
  //   bookmarked: false,
  //   tags: ["tiktok", "funny"],
  //   like: 4404,
  //   views: 3434,
  // });
  // const [slang, setSlang] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const slug = params.slug;
  const [example, setExample] = useState();
  const [slang, setSlang] = useState([]);

  const fetchSlang = () => {
    fetch(`/api/slang/${slug}`)
      .then((res) => res.json())
      .then((data) => setSlang(data))
      .catch(() => setError("Failed to load slang. Please try again later."));
  };

  useEffect(() => {
    fetchSlang();
  }, []);

  return (
    <div className="">
      <GoBack />
      <p>{JSON.stringify(example)}</p>
      <div className="flex justfiy-center items-center gap-5  flex-col w-full  ">
        <div className="lg:w-4xl w-full  flex-col flex gap-5">
          <div className="">
            <h2 className="font-bold">{slang.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-accent-foreground text-[0.9rem] md:text-sm">
              <div className="flex items-center gap-2">
                <User className="size-4 md:size-5" />
                <span>{slang.user_id}</span>
              </div>
              <div className="flex items-center gap-2 flex-grow">
                <Calendar className="size-4 md:size-5" />
                <span>{slang.updatedAt}</span>
              </div>

              <div className="flex items-center gap-2">
                <EyeIcon className="size-4 md:size-5" />
                {format_number(slang.view)}
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="size-4 md:size-5" />
                <span>{format_number(slang.like)}</span>
              </div>
            </div>
          </div>

          <div className="bg-transparent border border-secondary p-2 rounded-xl">
            <p className="">{slang.explanation}</p>
          </div>
          <div className="flex gap-4">
            {/* {slang.tags.map((tag, index) => (
              <Link href={tag} key={index} className="">
                #{tag}
              </Link>
            ))} */}
            <Link href={`/slang/${slang.category}`}>{slang.category}</Link>
          </div>
          <div>
            <h3>Example</h3>
            {slang.examples &&
              slang?.examples.map((example, index) => {
                <p
                  key={index}
                  className="bg-transparent border-secondary border p-2 rounded-xl"
                >
                  {example}
                </p>;
              })}
          </div>

          <div className="bg-secondary p-4 rounded-xl  gap-2 border border-primary">
            <h4 className="font-bold ">know better example?</h4>
            <p className="my-2">
              Share it with us and help others understand this slang even
              better!
            </p>
            <Button onClick={() => redirect("submit-slang")}>
              Submit slang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
