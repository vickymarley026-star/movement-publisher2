import React from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Star, DollarSign, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";

const studies = [
{
  title: "Ashes to the Ember Fae",
  author: "Empror Vee",
  genre: "Dark Fae Romantasy",
  metrics: [
  { icon: Star, label: "Amazon Rating", value: "4.8★" },
  { icon: TrendingUp, label: "Peak Rank", value: "#3" },
  { icon: DollarSign, label: "First Month", value: "$8.2K" }],

  quote: "Movement Publisher took my rough draft and turned it into a bestseller. The editing and cover design were phenomenal."
},
{
  title: "Sold to the Demon Prince",
  author: "Empror Vee",
  genre: "Dark Romantasy",
  metrics: [
  { icon: Star, label: "Amazon Rating", value: "4.9★" },
  { icon: TrendingUp, label: "Peak Rank", value: "#1" },
  { icon: DollarSign, label: "First Month", value: "$12.5K" }],

  quote: "From formatting to marketing, they handled everything. I just focused on writing and they did the rest."
}];

export default function CaseStudies() {
  const navigate = useNavigate();
  return null;

}