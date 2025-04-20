"use client"
import HeroLeft from "@/app/components/HeroLeft"
import { Spotlight } from "@/components/ui/spotlight-new"

export default function LoginPage() {
  return (
    <div className="h-screen w-full rounded-md bg-dark-1 relative overflow-hidden">
      <Spotlight />
      <HeroLeft />
    </div>
  )
}
