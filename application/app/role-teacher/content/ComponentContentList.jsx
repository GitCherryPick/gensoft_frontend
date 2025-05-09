"use client"

import { useState, useEffect, useCallback } from "react"
import { getContentByModuleId, deleteContent } from "@/lib/content/content-service"
import Spinner from "@/components/core/Spinner"
import ErrorMessage from "@/components/core/ErrorMessage"
import toast from "react-hot-toast"
import ContentCard from "./cards/ContentCard"

export default function ComponentContentList({ moduleId, onContentChange, refreshTrigger = 0 }) {
  const [contents, setContents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Convertir loadContents a una función memoizada con useCallback
  const loadContents = useCallback(async () => {
    if (!moduleId) return

    setIsLoading(true)
    setError(null)

    try {
      const moduleContents = await getContentByModuleId(moduleId)
      setContents(moduleContents)
    } catch (err) {
      console.error("Error al cargar contenidos:", err)
      setError("Error al cargar contenidos")
    } finally {
      setIsLoading(false)
    }
  }, [moduleId])

  // Efecto para cargar contenidos cuando cambia el moduleId o refreshTrigger
  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      if (!isMounted) return
      await loadContents()
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [moduleId, refreshTrigger, loadContents])

  // Método para actualizar la lista de contenidos cuando se añade uno nuevo
  useEffect(() => {
    if (onContentChange) {
      onContentChange(contents)
    }
  }, [contents, onContentChange])

  const handleDeleteContent = async (contentId) => {
    try {
      await deleteContent(contentId)
      setContents((prev) => prev.filter((content) => content.id !== contentId))
      toast.success("Contenido eliminado correctamente")
    } catch (error) {
      console.error("Error al eliminar contenido:", error)
      toast.error(error.message || "Error al eliminar el contenido")
    }
  }

  // Función para recargar los contenidos manualmente
  const refreshContents = async () => {
    await loadContents()
  }

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Spinner size="md" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage message="Error al cargar contenidos" />
      </div>
    )
  }

  if (contents.length === 0) {
    return (
      <div className="py-8 text-center text-light-3">
        <p>Este módulo no tiene contenidos</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <ContentCard key={content.id} content={content} onDelete={handleDeleteContent} />
      ))}
    </div>
  )
}
