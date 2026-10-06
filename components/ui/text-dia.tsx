"use client";
import { useState, useEffect, type HTMLAttributes } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
export interface DiaTextProps extends HTMLAttributes<HTMLSpanElement> {
  words: string[];
  duration?: number;
}
export function DiaText({
  words,
  duration = 2000,
  className,
  ...props
}: DiaTextProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (words.length < 2 || reducedMotion) return;
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      duration,
    );
    return () => clearInterval(interval);
  }, [words, duration, reducedMotion]);
  if (!words.length) return null;
  return (
    <span {...props} className={cn("dia-text", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span className="dia-spacers" aria-hidden="true">
        {words.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          aria-hidden="true"
          key={index}
          className="dia-word"
          initial={
            reducedMotion
              ? false
              : { x: "100%", opacity: 0, filter: "blur(4px)" }
          }
          animate={{ x: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={
            reducedMotion
              ? undefined
              : { x: "-100%", opacity: 0, filter: "blur(4px)" }
          }
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            filter: { duration: 0.2 },
          }}
        >
          <motion.span
            className="dia-color"
            initial={reducedMotion ? false : { backgroundPosition: "100% 0%" }}
            animate={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          >
            {words[index % words.length]}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
export default DiaText;
