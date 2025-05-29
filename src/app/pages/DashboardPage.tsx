import { getServerSession } from "next-auth";
import Navbar from "../components/Navbar";
import GrabDataComponent from "../components/GrabDataComponent";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function DashboardPage() {
  const session = await getServerSession();

  console.log("Session: ", session?.user);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <section className="">
      <Navbar />
      <GrabDataComponent />
      <Toaster />
    </section>
  );
}
