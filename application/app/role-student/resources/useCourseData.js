"use client"
import { useState, useEffect } from "react"
import { getDefaultCourse, getModulesByCourseId } from "@/lib/content/content-service"

export function useCourseData() {
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadCourseData() {
      try {
        setIsLoading(true)
        setError(null)

        const courseData = await getDefaultCourse()
        setCourse(courseData)

        if (courseData && courseData.id) {
          const moduleData = await getModulesByCourseId(courseData.id)
          setModules(moduleData)
        }
      } catch (err) {
        console.error("Error al cargar el curso:", err)
        setError(err.message || "Error al cargar la información del curso")
      } finally {
        setIsLoading(false)
      }
    }

    loadCourseData()
  }, [])

  return { course, modules, isLoading, error }
}
