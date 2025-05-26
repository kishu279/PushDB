"use client";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ProgressiveContent({ value }: { value: string }) {
  const scrollTarget = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });

  const words = value.split(" ");

  const [currentWord, setCurrentWord] = useState(0);
  const wordIndex = useTransform(scrollYProgress, [0, 0.8], [0, words.length]);

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(latest);
    });
  }, [wordIndex]);

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    console.log("Scroll Progress : ", latest)
  );

  return (
    <section className="py-28 lg:py-40 relative">
      {/* Gradient background */}

      <div className="container max-w-5xl mx-auto px-4">
        <div className="sticky top-80 md:top-30 lg:top-40">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-center mt-8 md:mt-10">
            <div className="mb-6 md:mb-8 lg:mb-10 pb-2">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={twMerge(
                    "transition duration-500 text-white/15",
                    wordIndex < currentWord && "text-white"
                  )}
                >
                  {`${word} `}
                </span>
              ))}
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent inline-block pb-4 px-2">
              The Helpful Environment to Grow.
            </div>
          </div>
        </div>
        <div className="h-[150vh] " ref={scrollTarget}></div>
      </div>

      {/* Subtle gradient orbs in background */}
      {/* <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-pink-500/5 blur-[100px] pointer-events-none"></div> */}
    </section>
  );
}
