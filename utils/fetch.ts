import headers from "@/constants/headers";
import { toast } from "sonner";
export const customFetch = async ({
  route,
  headers: customheader = {},
  method = "GET",
  requestData = {},
}) => {
  try {
    let res;
    if (method == "GET") {
      res = await fetch(route);
    } else {
      res = await fetch(route, {
        method,
        headers: customheader || headers,
        body: JSON.stringify(requestData),
      });
    }
    if (!res.ok) {
      let errorMessage = "😬 Yikes, something went wrong!";
      if (res.status === 400) {
        errorMessage = "🤔 Oops, your request looks sus. Double-check it!";
      } else if (res.status === 401) {
        errorMessage = "🚫 Not vibing. You need to log in first!";
      } else if (res.status === 403) {
        errorMessage = "🔒 Access denied. This area is off-limits!";
      } else if (res.status === 404) {
        errorMessage = "💀 Nah, this ain't here. Not found!";
      } else if (res.status >= 500) {
        errorMessage = "🔥 Server's having a meltdown. Try again later!";
      }
      toast.error(errorMessage, { position: "top-center" });
      return { error: true, message: "failed to fetch" };
    }
    const responseData = await res.json();
    return { error: false, data: responseData };
  } catch {
    toast.error("😬 Yikes, something went wrong!");
    return { error: true, message: "failed to fetch" };
  }
};
