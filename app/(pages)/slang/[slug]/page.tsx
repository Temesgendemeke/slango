"use client";
import GoBack from "@/components/GoBack";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  EyeIcon,
  PenIcon,
  ThumbsUp,
  Trash2Icon,
  User,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import format_number from "@/utils/format_number";
import SlangPageSkeleton from "@/components/SlangPageSkeleton";
import { get_relative_time } from "@/utils/relative_date";
import { languages } from "@/constants/languages";
import { authStore } from "@/store/useAuthStore";
import { toast } from "sonner";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const slug = params.slug;
  const [example, setExample] = useState();
  const [slang, setSlang] = useState([]);
  const user = authStore((store) => store.user);
  const router = useRouter();

  const fetchSlang = () => {
    setLoading(true);
    fetch(`/api/slang/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setSlang(data);
        setLoading(false);
      })
      .catch(() => setError("Failed to load slang. Please try again later."));
  };

  useEffect(() => {
    fetchSlang();
  }, []);

  const handleDelete = async () => {
    try {
      await fetch(`/api/slang/${slug}`, {
        method: "DELETE",
      });
      toast.message("🗑️ Deleted successfully");
      return router.push("/");
    } catch (error) {
      toast.error("❌ Oops! Failed to delete slang. Please try again. 😢");
    }
  };

  const handleEdit = () => {
    redirect(`/slang/edit/${slug}`);
  };
  return (
    <div className="">
      <GoBack />
      {loading ? (
        <SlangPageSkeleton />
      ) : (
        <div className="flex justfiy-center items-center gap-5  flex-col w-full  ">
          <div className="lg:w-4xl w-full  flex-col flex gap-5">
            <div className="">
              <h2 className="font-bold">{slang.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-accent-foreground text-[0.9rem] md:text-sm">
                <div className="flex items-center gap-2">
                  <User className="size-4 md:size-5" />
                  <span>{slang.posted_by.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-grow">
                  <Calendar className="size-4 md:size-5" />
                  <span>{get_relative_time(slang.updatedAt)}</span>
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
            {slang.englishPronunciation && (
              <div className="bg-transparent border border-secondary p-2 rounded-xl">
                <p>Pronoucation</p>
                <p>{slang.englishPronunciation}</p>
              </div>
            )}

            {slang.originator && (
              <div>
                <h3>Originator</h3>
                <div className="bg-transparent border border-secondary p-2 rounded-xl">
                  <p>{slang.originator}</p>
                </div>
              </div>
            )}

            {slang.language && (
              <div>
                <h3>language</h3>
                <div className="bg-transparent border border-secondary p-2 rounded-xl">
                  <p>{slang.language}</p>
                </div>
              </div>
            )}

            {slang.country && (
              <div>
                <h3>country</h3>
                <div className="bg-transparent border border-secondary p-2 rounded-xl">
                  <p>{slang.country}</p>
                </div>
              </div>
            )}

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
              {slang.examples?.map((example, index) => (
                <p
                  key={index}
                  className="bg-transparent border-secondary border p-2 rounded-xl"
                >
                  {example}
                </p>
              ))}
            </div>

            {slang.user_id == user.id && (
              <div className="flex gap-2">
                <Button variant={"destructive"} onClick={handleDelete}>
                  <Trash2Icon />
                  <span>Delete</span>
                </Button>
                <Button onClick={handleEdit}>
                  <PenIcon />
                  <span>Edit</span>
                </Button>
              </div>
            )}

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
      )}
    </div>
  );
};

export default page;
