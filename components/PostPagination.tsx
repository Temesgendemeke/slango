"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export function PostPagination({
  currentPage = 1,
  totalPage = 1,
  setCurrentPage,
  country,
}) {
  const router = useRouter();

  const goto = (pagenum) => {
    let query;

    if (country) {
      query = `?country=${country}&page=${pagenum}`;
    } else {
      query = `?page=${pagenum}`;
    }
    router.push(query);
    setCurrentPage(pagenum);
  };

  const getPages = () => {
    const pages = [];
    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(
          1,
          "ellipsis",
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPage
        );
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 && (
            <PaginationPrevious onClick={() => goto(currentPage - 1)} />
          )}
        </PaginationItem>
        {pages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => goto(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          {currentPage < totalPage && (
            <PaginationNext onClick={() => goto(currentPage + 1)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
