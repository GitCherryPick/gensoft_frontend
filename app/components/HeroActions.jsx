"use client"
import { useEffect } from "react"
import Button from "@/components/core/Button"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/navigation"

export default function HeroActions({ onGetStarted }) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(ROUTES.STUDENT.ROOT)
    router.prefetch(ROUTES.ADMIN.ROOT)
    router.prefetch(ROUTES.TEACHER.ROOT)
  }, [router])

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
