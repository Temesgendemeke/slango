import type { Metadata } from "next";

export const getMetadata = ({ title, description }: Metadata) => {
  return {
    title,
    description,
  };
};
