import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" bg-neutral-950">
      {children}
    </section>
  );
}
