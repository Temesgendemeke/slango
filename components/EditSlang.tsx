"use client";
import { Edit2Icon, EllipsisVertical, Trash2 } from "lucide-react";
import { authStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EditSlang = ({ slug, setSlang }) => {
  const user = authStore((store) => store.user);
  const router = useRouter();

  const deletePost = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch(`/api/slang/${slug}`, {
        method: "DELETE",
      });
      setSlang((prev) => {
        const filteredSlang = prev.filter((post) => post.slug !== slug);
        return filteredSlang;
      });
    } catch (error) {
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
            <DropdownMenuItem onClick={deletePost}>
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
