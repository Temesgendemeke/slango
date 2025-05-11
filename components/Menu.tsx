import { TrendingUp } from "lucide-react";
import React, { useState } from "react";

const Menu = () => {
  const menu = [
    { title: "trending", icon: <TrendingUp /> },
    { title: "recent" },
    { title: "Popular" },
  ];
  const [active, setActive] = useState("recent")
  return (
    <div className="flex  bg-card text-sm  w-fit rounded-xl overflow-hidden">
      {menu.map((item, index) => {
        return (
          <div
            key={index}
            className={`${active == item.title ? 'bg-secondary':"bg-transparent"} flex gap-1 p-3 md:p-4 capitalize hover:bg-secondary cursor-pointer`}
            onClick={()=>setActive(item.title)}
          >
            {item.icon} <p className="text-sm">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
