"use server";
import ExploreSlang from "@/components/ExploreSlang";
import { getMetadata } from "@/lib/getMetadata";

export async function generateMetadata() {
  return getMetadata({
    title: "Explore",
  });
}

export default async function Page ({ searchParams }){
  const { country, page } = await searchParams;

  return <ExploreSlang page={page} country={country} />;
};

