"use client";
import React, { useState } from "react";
import Image from "next/image";
import avater from "../../../assets/Rapper=fiftycent.png";
import CustomCard from "@/components/CustomCard";

const page = () => {
  const user = {
    username: "50cent",
    full_name: "Curtis Jackson",
    email: "50cent@example.com",
    joined: "2023-02-01",
    post: 4343,
    like: 7676,
    view: 32323,
  };

  const [slang, setSlang] = useState([
    {
      id: 1,
      name: "get rich",
      explanation:
        "To hustle hard and make a lot of money, no matter the cost.",
      example: "He’s out there every day tryna get rich, just like 50 said.",
      date: "2024-10-15",
      author: "slang_user_001",
      bookmarked: false,
    },
    {
      id: 2,
      name: "g-unit",
      explanation: "A tight crew or gang that’s loyal and built for success.",
      example: "Me and my boys roll deep like G-Unit.",
      date: "2024-10-16",
      author: "slang_user_001",
      bookmarked: false,
    },
    {
      id: 3,
      name: "many men",
      explanation:
        "A reference to having a lot of enemies or people wishing for your downfall.",
      example: "I don’t trust nobody — too many men out here plotting.",
      date: "2024-10-17",
      author: "slang_user_001",
      bookmarked: false,
    },
    {
      id: 4,
      name: "hustler",
      explanation:
        "A person who works hard, especially by any means necessary, to succeed or survive.",
      example:
        "She’s a real hustler — got two jobs and still makes time to study.",
      date: "2024-10-18",
      author: "slang_user_001",
      bookmarked: false,
    },
    {
      id: 5,
      name: "in da club",
      explanation:
        "A way to describe celebrating or partying, especially in a nightclub.",
      example: "It’s my birthday, so you know I’m in da club tonight!",
      date: "2024-10-19",
      author: "slang_user_001",
      bookmarked: false,
    },
    {
      id: 6,
      name: "window shopper",
      explanation:
        "Someone who looks at expensive things they can't afford; a hater.",
      example: "He talks big but never buys — just a window shopper.",
      date: "2024-10-20",
      author: "slang_user_001",
      bookmarked: false,
    },
  ]);

  return (
    <div className="flex flex-col gap-4  items-center mt-10">
      <div>
        <Image
          alt="user avater"
          src={avater}
          className="rounded-full border border-primary p-4"
        />
        <h4 className="text-center text-2xl  font-bold mt-4">
          @{user.username}
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
          <CustomCard  key={index} item={item} setSlang={setSlang} />
        ))}
      </div>
    </div>
  );
};

export default page;
