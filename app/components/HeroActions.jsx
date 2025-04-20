"use client"
import Button from "@/components/core/Button"

export default function HeroActions({ onGetStarted }) {
  return (
    <div className="mt-5">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <Button onClick={onGetStarted} className="w-full sm:w-auto">
          Comenzar Ahora
        </Button>
      </div>
    </div>
  )
}
