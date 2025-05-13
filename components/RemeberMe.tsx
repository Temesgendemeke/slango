import React from "react";
import { Checkbox } from "@radix-ui/react-checkbox";

const RemeberMe = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms"  />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Rembeber me
      </label>
    </div>
  );
};

export default RemeberMe;
