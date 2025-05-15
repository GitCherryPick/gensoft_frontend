"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import ComponentHero from "./ComponentHero";
import ComponentHomeAction from "./ComponentHomeAction";
import ComponentFormLoginCard from "./ComponentFormLoginCard";
import FadeIn from "@/components/animations/FadeIn";

export default function HomeClientContent() {
  const searchParams = useSearchParams();
  const [showLoginCard, setShowLoginCard] = useState(false);

  useEffect(() => {
    const loginParam = searchParams.get("login");
    if (loginParam === "true") {
      setShowLoginCard(true);
    } else {
      setShowLoginCard(false);
    }
  }, [searchParams]);

  return (
    <AnimatePresence mode="wait">
      {!showLoginCard ? (
        <FadeIn
          key="hero"
          className="max-w-xl mx-0 lg:mx-12 xl:mx-24 2xl:mx-36 text-left"
        >
          <ComponentHero />
          <ComponentHomeAction
            onGetStarted={() => setShowLoginCard(true)}
          />
        </FadeIn>
      ) : (
        <FadeIn
          key="login"
          className="flex justify-center items-center"
          initialY={10}
          exitY={-10}
        >
          <ComponentFormLoginCard
            onBack={() => setShowLoginCard(false)}
          />
        </FadeIn>
      )}
    </AnimatePresence>
  );
}