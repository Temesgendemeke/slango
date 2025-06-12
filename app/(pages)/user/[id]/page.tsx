import UserProfile from "@/components/UserProfile";
import { fetchUserbyId } from "@/utils/fetch";


export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await fetchUserbyId(id);

  return {
    title: user.name,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const user = await fetchUserbyId(id);

  return <UserProfile user={user} />;
}
