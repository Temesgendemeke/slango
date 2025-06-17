"use client";
import { Edit2Icon, EllipsisVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostStore } from "@/store/usePostStore";

const EditSlang = ({ slug }) => {
  const router = useRouter();
  const deletePost = usePostStore((state) => state.deletePost);

  const handleDeletion = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch(`/api/slang/${slug}`, {
        method: "DELETE",
      });
      await deletePost(slug);
    } catch {
      toast.error("Failed to delete the post.");
    }
  };

  return (
    <div
      className="absolute right-2 cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/slang/edit/${slug}`);
              }}
            >
              <Edit2Icon />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeletion}>
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EditSlang;
