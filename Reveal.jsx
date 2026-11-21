import React from "react";
import { motion } from "framer-motion";

const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0 },
  },
  "scale": {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1 },
  },
  "bounce": {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  "bounce-left": {
    hidden: { opacity: 0, x: -80, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1 },
  },
  "bounce-right": {
    hidden: { opacity: 0, x: 80, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1 },
  },
};

const transitions = {
  "fade-up": { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  "fade-down": { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  "slide-left": { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  "slide-right": { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  "scale": { type: "spring", stiffness: 200, damping: 18 },
  "bounce": { type: "spring", stiffness: 220, damping: 14, mass: 0.8 },
  "bounce-left": { type: "spring", stiffness: 220, damping: 14, mass: 0.8 },
  "bounce-right": { type: "spring", stiffness: 220, damping: 14, mass: 0.8 },
};

export default function Reveal({
  children,
  delay = 0,
  y,
  variant = "fade-up",
  className = "",
}) {
  const v = variants[variant] || variants["fade-up"];
  const initial = y !== undefined ? { ...v.hidden, y } : v.hidden;
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={v.show}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, ...transitions[variant] }}
    >
      {children}
    </motion.div>
  );
}