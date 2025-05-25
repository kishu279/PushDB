"use client";

import { useSession } from "next-auth/react";
import StaggeredText from "./Staggered";
import ProgressiveContent from "./ProgressiveContent";

export default function Herocontent() {
  const { data: session } = useSession();

  return (
    <section className=" mt-[100px]  ">
      <div className="text-4xl container max-w-5xl font-bold mx-auto place-items-center">
        <h1 className="-mt-[100px]">
          <StaggeredText
            text="PushDB — Secure. Stateless. Seamless Data Migration."
            className="inline-block"
            once={true}
          />
        </h1>
        {/* <p>
          Effortlessly migrate data to MongoDB with zero state retention and
          full encryption. PushDB makes secure, seamless data transfer simple
          and fast.
        </p> */}

        <ProgressiveContent
          value="Effortlessly migrate data to MongoDB with zero state retention and
          full encryption. PushDB makes secure, seamless data transfer simple
          and fast."
        />
      </div>
    </section>
  );
}
