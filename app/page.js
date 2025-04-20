"use client"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import HeroTitleAndDescription from "@/app/components/HeroTitleAndDescription"
import HeroActions from "@/app/components/HeroActions"
import LoginCard from "@/app/components/LoginCard"
import { Spotlight } from "@/components/ui/spotlight-new"
import FadeIn from "@/components/animations/FadeIn"

export default function LoginPage() {
  const [showLoginCard, setShowLoginCard] = useState(false)

  return (
    <div className="h-screen w-full rounded-md bg-dark-1 relative overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Spotlight />
      </div>

      <div className="w-full min-h-screen flex items-center relative z-30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!showLoginCard ? (
              <FadeIn key="hero" className="max-w-xl mx-0 lg:mx-12 xl:mx-24 2xl:mx-36 text-left">
                <HeroTitleAndDescription />
                <HeroActions onGetStarted={() => setShowLoginCard(true)} />
              </FadeIn>
            ) : (
              <FadeIn key="login" className="flex justify-center items-center" initialY={10} exitY={-10}>
                <LoginCard onBack={() => setShowLoginCard(false)} />
              </FadeIn>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
