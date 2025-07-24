import { TabBar } from "@/components/TabBar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies",
  description: "Page to display cookies",
};

export default async function CookiesPage() {

  const cookieStore = await cookies();
  const selectedTab = cookieStore.get('selectedTab')?.value || '1';

  return (
    <>
      <TabBar currentTab={parseInt(selectedTab)} />
    </>
  );
}