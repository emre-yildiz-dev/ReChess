import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import { Link } from "@remix-run/react";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    button?: {
      label: string;
      href: string;
    };
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 py-10"
      ref={ref}
    >
      <div className="div relative flex items-start w-1/2">
        <div>
          {content.map((item, index) => (
            <div key={item.title + index} className="my-32">
              <motion.h3
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="lead max-w-xl mt-10"
              >
                {item.description}
              </motion.p>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="lead max-w-xl mt-10"
              >
                <Button className="w-36">
                  <Link to={item.button?.href ?? ""}>{item.button?.label}</Link>
                </Button>
              </motion.div>
            </div>
          ))}
          <div className="h-30" />
        </div>
      </div>
      <motion.div
        className={cn(
          "hidden lg:block w-1/2 rounded-md sticky top-5 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};
