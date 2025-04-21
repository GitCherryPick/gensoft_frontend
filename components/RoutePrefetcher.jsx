"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/navigation"

export default function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(ROUTES.STUDENT.ROOT)
    router.prefetch(ROUTES.STUDENT.PROBLEMS)

    router.prefetch(ROUTES.ADMIN.ROOT)
    router.prefetch(ROUTES.ADMIN.USERS)

    router.prefetch(ROUTES.TEACHER.ROOT)
    router.prefetch(ROUTES.TEACHER.TASKS)

    console.log("Routes prefetched for faster navigation")
  }, [router])

  return null
}
