import { Edit2Icon, EllipsisVertical,  Trash2 } from "lucide-react";
import { authStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/auth-client";
import { toast } from "sonner";

const EditSlang = () => {
  const user = authStore((store) => store.user);

  const router = useRouter();
  const handleClick = async () => {
    try {
      //   remove
      await signOut();
      router.push("/login");
    } catch (_) {
      toast.error("Error during sign out. Please try again.");
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
                router.push("/submit-slang");
              }}
            >
              <Edit2Icon />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
            >
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
