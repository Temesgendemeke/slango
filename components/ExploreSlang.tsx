"use client";
import CardSkeleton from "@/components/CardSkeleton";
import CustomCard from "@/components/CustomCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { PostPagination } from "@/components/PostPagination";
import { customFetch } from "@/utils/fetch";

const ExploreSlang = ({ page, country }) => {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [slang, setSlang] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSlang, setFilteredSlang] = useState([]);
  const [loading, setLoading] = useState(true);

  const perpage = 5;
  const [totalPage, setTotalPage] = useState<number>();


  const fetchPost = async () => {
    const res = await fetch(
      `/api/slang?page=${currentPage}&perpage=${perpage}`
    );

    if (!res.ok) {
      return toast.error("Failed to fetch slang terms 😢");
    }
    const data = await res.json();

    setSlang(data.posts);
    setTotalPage(data.total_page);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    if (country) {
      fetchbyCountry();
    } else {
      fetchPost();
    }
  }, [currentPage]);

  const fetchbyCountry = async () => {
    const pre_page = 10;

    setLoading(true);
    const { error, data } = await customFetch({
      route: `/api/slang/country/${country}?page=${page}&prepage=${pre_page}`,
    });

    if (error) {
      return setLoading(false);
    }
    setSlang(data.posts);
    setTotalPage(data.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    setFilteredSlang(slang || []);
  }, [loading, setFilteredSlang]);

  useEffect(() => {
    if (!loading) {
      const res =
        searchTerm.trim() == ""
          ? slang
          : slang.filter((item) => item.name.includes(searchTerm));
      setFilteredSlang(res);
    }
  }, [searchTerm]);

  return (
    <div className="px-2 space-y-10 flex flex-col min-h-[calc(100vh-80px)]">
      {loading ? (
        <>
          <Skeleton className="mt-10 w-92 h-20" />
          <CardSkeleton length={10} />
        </>
      ) : (
        <div className="flex-grow space-y-5">
          <div className="relative mt-10 w-92">
            <Input
              type="text"
              placeholder="search slang term"
              className="w-full h-full p-3 md:p-4 pl-10 md:px-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute transform top-1/2 -translate-y-1/2 left-2" />
          </div>

          {filteredSlang?.length == 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 w-full">
              <h3 className="text-center w-full uppercase text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
                No Slang Found
              </h3>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 w-full">
                {filteredSlang.map((post, index) => (
                  <CustomCard key={index} post={post} />
                ))}
              </div>
              <PostPagination
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
                country={country}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreSlang;
