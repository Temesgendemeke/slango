import UserProfile from "@/components/UserProfile";
import { IdPagePropes } from "@/types/Props";
import { fetchUserbyId } from "@/utils/fetch";



export async function generateMetadata({ params }: IdPagePropes) {
  const { id } = await params;
  const user = await fetchUserbyId(id);

  return {
    title: user.name,
  };
}

export default async function Page({ params }:IdPagePropes) {
  const { id } = await params;
  const user = await fetchUserbyId(id);

  return <UserProfile user={user} />;
}
