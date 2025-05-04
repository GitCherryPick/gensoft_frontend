"use client"

import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getDefaultCourse, getModulesByCourseId } from "@/lib/content/content-service"
import Spinner from "@/components/core/Spinner"
import ErrorMessage from "@/components/core/ErrorMessage"
import AnimationCascadeList from "./AnimationCascadeList"
import ComponentAddModuleButton from "./ComponentAddModuleButton"

export default function ComponentContentList({ onModuleSelect }) {
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedModuleId, setSelectedModuleId] = useState(null)
  const [retriesExhausted, setRetriesExhausted] = useState(false)

  const retryCount = useRef(0)
  const maxRetries = 3
  const retryDelay = 2000

  useEffect(() => {
    let isMounted = true
    let retryTimeout = null

    async function loadData() {
      if (!isMounted) return

      setIsLoading(true)
      setError(null)

      try {
        const defaultCourse = await getDefaultCourse()
        if (!isMounted) return

        setCourse(defaultCourse)

        if (defaultCourse) {
          const courseModules = await getModulesByCourseId(defaultCourse.id)
          if (!isMounted) return

          setModules(courseModules)
          retryCount.current = 0
          setRetriesExhausted(false)
        }
      } catch (err) {
        if (!isMounted) return

        console.error("Error al cargar datos:", err)
        setError(err.message || "Error al cargar los datos")

        if (retryCount.current < maxRetries) {
          retryCount.current += 1
          console.log(`Reintentando (${retryCount.current}/${maxRetries}) en ${retryDelay}ms...`)

          retryTimeout = setTimeout(() => {
            if (isMounted) {
              loadData()
            }
          }, retryDelay)
        } else {
          setRetriesExhausted(true)
        }
      } finally {
        if (isMounted) {
          if (error && retryCount.current >= maxRetries) {
            setIsLoading(false)
          } else if (!error) {
            setIsLoading(false)
          }
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
    }
  }, [])

  const handleModuleSelect = (moduleId) => {
    setSelectedModuleId(moduleId)
    const selectedModule = modules.find((m) => m.id === moduleId)
    if (selectedModule && onModuleSelect) {
      onModuleSelect(selectedModule)
    }
  }

  const handleModuleCreated = (newModule) => {
    // Añadir el nuevo módulo a la lista
    setModules((prevModules) => [...prevModules, newModule])

    // Seleccionar automáticamente el nuevo módulo
    setSelectedModuleId(newModule.id)
    if (onModuleSelect) {
      onModuleSelect(newModule)
    }
  }

  if (isLoading || (error && !retriesExhausted)) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="md" />
      </div>
    )
  }

  if (error && retriesExhausted) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorMessage message="Error al cargar módulos" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col scrollbar-hide">
      <ScrollArea className="flex-grow scrollbar-hide" scrollHideDelay={0}>
        {course && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 flex items-center justify-center bg-cta-1 rounded-md text-black font-medium">
                {course.title.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-lg font-bold">{course.title}</span>
            </div>
          </div>
        )}

        <div className="space-y-3 max-w-full">
          <AnimationCascadeList>
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isSelected={selectedModuleId === module.id}
                onClick={() => handleModuleSelect(module.id)}
              />
            ))}
          </AnimationCascadeList>

          {course && (
            <ComponentAddModuleButton
              delay={modules.length * 0.05 + 0.1}
              courseId={course.id}
              onModuleCreated={handleModuleCreated}
            />
          )}

          <div className="h-24"></div>
        </div>
      </ScrollArea>
    </div>
  )
}

function ModuleCard({ module, isSelected, onClick }) {
  return (
    <div
      className={`p-4 rounded-md border transition-all ${
        isSelected ? "border-l-4 border-cta-1 bg-cta-selected" : "border-dark-2 hover:bg-cta-hover"
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{module.title}</h3>
      </div>
    </div>
  )
}
