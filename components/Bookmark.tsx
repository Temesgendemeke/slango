"use client";
import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import React from "react";

interface BookmarkProps {
  isBookmarked: boolean;
  setIsBookmarked: (prev: boolean) => boolean;
}

const Bookmark = ({ id,isBookmarked, setSlang }: BookmarkProps) => {
  const handleBookmark = () => {
    setSlang((bookmarks) => bookmarks.map(bookmark=>(bookmark.id == id ? {...bookmark, bookmarked:!bookmark.bookmarked} : bookmark)));
  };
  return (
    <div className="absolute right-2 cursor-pointer" onClick={handleBookmark}>
      {isBookmarked ? <BookmarkCheck /> : <BookmarkIcon />}
    </div>
  );
};

export default Bookmark;
