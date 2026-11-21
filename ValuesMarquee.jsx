import React from "react";
import { Sparkles, BookOpen, TrendingUp, Award, PenLine, Target, Users, Rocket } from "lucide-react";

const values = [
{ icon: PenLine, text: "Professional Editing" },
{ icon: BookOpen, text: "Expert Formatting" },
{ icon: TrendingUp, text: "Amazon KDP Marketing" },
{ icon: Award, text: "Proven Author Results" },
{ icon: Target, text: "Tailored Publishing Strategy" },
{ icon: Users, text: "Dedicated Author Support" },
{ icon: Rocket, text: "From Draft to Launch" },
{ icon: Sparkles, text: "Your Story, Perfected" }];

export default function ValuesMarquee() {
  const items = [...values, ...values];
  return null;

}