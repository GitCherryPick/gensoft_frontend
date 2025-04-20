"use client"
import HeroTitleAndDescription from "./HeroTitleAndDescription"
import HeroActions from "./HeroActions"

export default function HeroLeft() {
  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-xl mx-0 lg:mx-12 xl:mx-24 2xl:mx-36 text-left">
          <HeroTitleAndDescription />
          <HeroActions />
        </div>
      </div>
    </div>
  )
}
