"use client";

import { useSession } from "next-auth/react";

export default function Herocontent() {
  const { data: session } = useSession();

  return (
    <section className=" mt-24 ">
      <div className="text-4xl container max-w-5xl font-bold mx-auto">
        <h1>Hii {session?.user?.name || "User"}</h1>
      </div>
    </section>
  );
}
