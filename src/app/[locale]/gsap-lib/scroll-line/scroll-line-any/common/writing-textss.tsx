"use client";

export const title = "Writing Text";

import {
  motion,
  type Transition,
  type UseInViewOptions,
  useInView,
} from "motion/react";
import * as React from "react";

type WritingTextProps = {
  text: string;
  inView?: boolean;
  spacing?: number | string;
  transition?: Transition;
} & React.HTMLAttributes<HTMLSpanElement>;

function WritingTextss({
  inView = false,
  spacing = 3,
  text,
  transition = { type: "spring", bounce: 0, duration: 2, delay: 0.5 },
  ...props
}: WritingTextProps) {
  const words = React.useMemo(() => text.split(" "), [text]);

  return (
    <span {...(props as any)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            ...transition,
            delay: index * (transition.delay ?? 0),
          }}
          className="inline-block"
          style={{ marginRight: spacing }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  );
}

export { WritingTextss, type WritingTextProps };
export default WritingTextss;
