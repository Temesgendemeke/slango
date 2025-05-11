import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center my-4">
      <p className="text-center ">
        © {new Date().getFullYear()} Slango. Developed by{" "}
        <Link
          href="https://github.com/temesgendemeke"
          className="hover:underline text-primary font-bold"
        >
          Temesgen
        </Link>
        .
      </p>
    </div>
  );
};

export default Footer;
