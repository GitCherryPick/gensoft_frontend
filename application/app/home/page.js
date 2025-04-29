"use client"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import ComponentHero from "./ComponentHero"
import ComponentHomeAction from "./ComponentHomeAction"
import ComponentFormLoginCard from "./ComponentFormLoginCard"
import { Spotlight } from "@/components/ui/spotlight-new"
import FadeIn from "@/components/animations/FadeIn"
import Link from "next/link"
import { ROUTES } from "@/lib/navigation"

export default function HomePage() {
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
                <ComponentHero />
                <ComponentHomeAction onGetStarted={() => setShowLoginCard(true)} />
              </FadeIn>
            ) : (
              <FadeIn key="login" className="flex justify-center items-center" initialY={10} exitY={-10}>
                <ComponentFormLoginCard onBack={() => setShowLoginCard(false)} />
              </FadeIn>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <Link href={ROUTES.STUDENT.ROOT} prefetch={true} />
        <Link href={ROUTES.STUDENT.COURSES} prefetch={true} />
        <Link href={ROUTES.ADMIN.ROOT} prefetch={true} />
        <Link href={ROUTES.ADMIN.USERS} prefetch={true} />
        <Link href={ROUTES.TEACHER.ROOT} prefetch={true} />
        <Link href={ROUTES.TEACHER.TASKS} prefetch={true} />
      </div>
    </div>
  )
}
