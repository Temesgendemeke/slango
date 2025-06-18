import React from "react";
import { Button } from "./ui/button";
import { Eye, EyeOffIcon } from "lucide-react";

const EyeButton = ({ showPassword, setShowPassword }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      tabIndex={-1}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 h-auto w-auto"
      onClick={() => setShowPassword((prev) => !prev)}
    >
      {showPassword ? <EyeOffIcon size={18} /> : <Eye size={18} />}
    </Button>
  );
};

export default EyeButton;
