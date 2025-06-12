"use client";
import GoBack from "@/components/GoBack";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Calendar,
  EyeIcon,
  PenIcon,
  Trash2Icon,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SlangPageSkeleton from "@/components/SlangPageSkeleton";
import { get_relative_time } from "@/utils/relative_date";
import { authStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { getCountry, getLanguage } from "@/utils/getCountry";
import SubmitExample from "@/components/SubmitExample";
import { Slang } from "@/types/slang";
import format_number from "@/utils/format_number";

const GetPostbySlug = ({ slug, data }) => {
  const [loading, setLoading] = useState(true);
  const [slang, setSlang] = useState<Slang>(data);
  const user = authStore((store) => store.user);
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);

  //   const fetchSlang = () => {
  //     setLoading(true);
  //     fetch(`/api/slang/${slug}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         fetch(`/api/slang/views/${data.id}`, { method: "PUT" });
  //         setSlang(data);
  //         setLoading(false);
  //       })
  //       .catch(() =>
  //         toast.error(
  //           "😬 Whoops! Couldn't load the slang. Try again later, bestie 🚧"
  //         )
  //       );
  //   };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/slang/views/${data.id}`, { method: "PUT" });
    setLoading(false);
    // fetchSlang();
  }, []);

  const handleDelete = async () => {
    try {
      await fetch(`/api/slang/${slug}`, {
        method: "DELETE",
      });
      toast.message("🗑️ Deleted successfully");
      return router.push("/");
    } catch {
      toast.error("❌ Oops! Failed to delete slang. Please try again. 😢");
    }
  };

  const handleEdit = () => {
    return router.push(`/slang/edit/${slug}`);
  };
  return (
    <div className="pb-10">
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
                  <Link href={`/user/${slang.posted_by.id}`}>
                    {slang.posted_by.name}
                  </Link>
                </div>
                <div className="flex items-center gap-2 flex-grow">
                  <Calendar className="size-4 md:size-5" />
                  <span>{get_relative_time(slang.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <EyeIcon className="size-4 md:size-5" />
                  <p>{format_number(slang._count.views)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Bookmark className="size-4 md:size-5" />
                </div>
              </div>
            </div>

            <div className="bg-transparent border border-secondary p-2 ">
              <p className="">{slang.explanation}</p>
            </div>

            {slang.englishPronunciation && (
              <div>
                <h3>Pronoucation</h3>
                <div className="bg-transparent border border-secondary p-2 ">
                  <p>{slang.englishPronunciation}</p>
                </div>
              </div>
            )}

            {slang.originator && (
              <div>
                <h3>Originator</h3>
                <div className="bg-transparent border border-secondary p-2">
                  <p>{slang.originator}</p>
                </div>
              </div>
            )}

            {slang.language && (
              <div>
                <h3>language</h3>
                <div className="bg-transparent border border-secondary p-2 ">
                  <p>{getLanguage(slang.language)}</p>
                </div>
              </div>
            )}

            {slang.country && (
              <div>
                <h3>country</h3>
                <div className="bg-transparent border border-secondary p-2 ">
                  <p>{getCountry(slang.country)}</p>
                </div>
              </div>
            )}

            <div>
              <h3>Example</h3>
              {slang.examples?.map((example, index) => (
                <p
                  key={index}
                  className="bg-transparent border-secondary border p-2 "
                >
                  {example}
                </p>
              ))}
            </div>

            {slang?.user_id == user?.id && (
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

            {showInput && (
              <SubmitExample
                slug={slang.slug}
                prevExamples={slang.examples}
                setSlang={setSlang}
              />
            )}

            <div className="bg-secondary p-4 rounded-xl   gap-2 border border-primary">
              <h4 className="font-bold ">know better example?</h4>
              <p className="my-2">
                Share it with us and help others understand this slang even
                better!
              </p>
              <Button onClick={() => setShowInput((prev) => !prev)}>
                Submit slang
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetPostbySlug;
