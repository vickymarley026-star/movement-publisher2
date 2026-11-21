import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedText - splits text into words and reveals them with a staggered
 * bounce effect when scrolled into view.
 *
 * Props:
 * - text: string (required)
 * - className: applied to each word span
 * - delay: stagger start delay (seconds)
 * - stagger: delay between each word (seconds)
 * - as: wrapper element (default "h2")
 */
export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as: Tag = "h2",
}) {
  const words = text.split(" ");
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word = {
    hidden: { opacity: 0, y: 24, rotateX: -40 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 260, damping: 16 },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}