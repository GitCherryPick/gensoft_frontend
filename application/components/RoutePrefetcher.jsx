"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/navigation"

export default function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(ROUTES.HOME)

    router.prefetch(ROUTES.STUDENT.ROOT)
    router.prefetch(ROUTES.STUDENT.COURSES)
    router.prefetch(ROUTES.STUDENT.PROFILE)

    router.prefetch(ROUTES.ADMIN.ROOT)
    router.prefetch(ROUTES.ADMIN.USERS)
    router.prefetch(ROUTES.ADMIN.ENROLLMENT)

    router.prefetch(ROUTES.TEACHER.ROOT)
    router.prefetch(ROUTES.TEACHER.TASKS)
    router.prefetch(ROUTES.TEACHER.CONTENT)
  }, [router])

  return null
}
