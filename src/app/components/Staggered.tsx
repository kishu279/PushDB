"use client";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { JSX, useEffect } from "react";

type StaggeredTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
};

const defaultAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.1 },
};

export default function StaggeredText({
  text,
  el: Wrapper = "p",
  className,
  once,
}: StaggeredTextProps) {
  // const ref = useRef(null);
  const [scope, animate] = useAnimate();
  // const isInView = useInView(ref, { amount: 0.5, once });
  const isInView = useInView(scope, { amount: 0.5, once });

  useEffect(() => {
    if (isInView) {
      animate("span", { opacity: 1 }, { delay: stagger(0.1) });
    } else {
      animate("span", { opacity: 0 }, { duration: 0 });
    }
  }, [isInView, animate]);

  return (
    <section className="container h-screen w-screen mx-auto">
      <div className="flex justify-center items-center top-16 h-full text-center">
        <h1 className="text-4xl md:text-7xl uppercase font-extrabold leading-tight">
          <Wrapper className={className}>
            <span className="sr-only">{text}</span>
            <motion.span
              // ref={ref}
              ref={scope}
              initial="hidden"
              // animate={isInView ? "visible" : "hidden"}
              // transition={{ staggerChildren: 0.1 }}
              aria-hidden
            >
              {text.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-2 ">
                  {Array.from(word).map((char, j) => (
                    <motion.span
                      key={`${i}-${j}`}
                      className="inline-block "
                      variants={defaultAnimation}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Add actual space between words */}
                  <span className="inline-block">&nbsp;</span>
                </span>
              ))}
            </motion.span>
          </Wrapper>
        </h1>
      </div>
    </section>
  );
}
