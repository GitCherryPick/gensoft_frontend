"use client"

import { useState, useEffect } from "react"
import { getContentByModuleId, deleteContent } from "@/lib/content/content-service"
import Spinner from "@/components/core/Spinner"
import ErrorMessage from "@/components/core/ErrorMessage"
import toast from "react-hot-toast"
import ContentCard from "./cards/ContentCard"
import CardContentImage from "./cards/CardContentImage"
import CardContentPDF from "./cards/CardContentPDF"
import CardContentSlide from "./cards/CardContentSlide"
import CardContentVideo from "./cards/CardContentVideo"

export default function ComponentContentList({ moduleId, onContentChange }) {
  const [contents, setContents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadContents() {
      if (!moduleId) return

      setIsLoading(true)
      setError(null)

      try {
        const moduleContents = await getContentByModuleId(moduleId)
        if (isMounted) {
          // Ordenar por fecha de creación (más reciente primero)
          const sortedContents = [...moduleContents].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          setContents(sortedContents)
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error al cargar contenidos:", err)
          setError("Error al cargar contenidos")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadContents()

    return () => {
      isMounted = false
    }
  }, [moduleId])

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

  // Función para renderizar el componente adecuado según el tipo de contenido
  const renderContentCard = (content) => {
    switch (content.content_type.toLowerCase()) {
      case "image":
        return <CardContentImage key={content.id} content={content} onDelete={handleDeleteContent} />
      case "pdf":
        return <CardContentPDF key={content.id} content={content} onDelete={handleDeleteContent} />
      case "slide":
        return <CardContentSlide key={content.id} content={content} onDelete={handleDeleteContent} />
      case "video":
        return <CardContentVideo key={content.id} content={content} onDelete={handleDeleteContent} />
      default:
        return <ContentCard key={content.id} content={content} onDelete={handleDeleteContent} />
    }
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

  // Separar contenidos en textos y no-textos
  const textContents = contents.filter((content) => content.content_type.toLowerCase() === "text")
  const otherContents = contents.filter((content) => content.content_type.toLowerCase() !== "text")

  return (
    <div className="space-y-6">
      {/* Sección de contenidos de texto (ancho completo) */}
      {textContents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-light-1">Contenidos de texto</h3>
          <div className="space-y-4">{textContents.map((content) => renderContentCard(content))}</div>
        </div>
      )}

      {/* Sección de otros contenidos (cuadrícula de 2 columnas) */}
      {otherContents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-light-1">Otros contenidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherContents.map((content) => renderContentCard(content))}
          </div>
        </div>
      )}
    </div>
  )
}
