"use client"
import { useState, useEffect } from "react"
import { getContentByModuleId } from "@/lib/content/content-service"
import ContentText from "./ContentText"
import ContentVideo from "./ContentVideo"
import ContentPDF from "./ContentPDF"

export default function ComponentModuleContent({ moduleId }) {
  const [contents, setContents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchContents() {
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
    }

    fetchContents()
  }, [moduleId])

  const renderContent = (content) => {
    switch (content.content_type) {
      case "text":
        return <ContentText key={content.id} content={content} />
      case "video":
        return <ContentVideo key={content.id} content={content} />
      case "pdf":
        return <ContentPDF key={content.id} content={content} />
      default:
        return (
          <div key={content.id} className="border border-gray-200 dark:border-gray-700 rounded mb-4">
            <pre className="text-xs overflow-x-auto p-2 max-w-full whitespace-pre-wrap break-words">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        )
    }
  }

    if (isLoading) return <div>Cargando contenidos...</div>
    if (error) return <div>Error: {error}</div>
    if (!moduleId) return <div>Seleccione un módulo para ver sus contenidos</div>
    if (contents.length === 0) return <div>Este módulo no tiene contenidos</div>

    const contentTypeOrder = {
    text: 1,
    video: 2,
    pdf: 3,
    }

    const orderedContents = [...contents].sort((a, b) => {
    const orderA = contentTypeOrder[a.content_type] || 99
    const orderB = contentTypeOrder[b.content_type] || 99
    return orderA - orderB
    })

    return (
    <div className="w-full max-w-full">
        <div className="space-y-2">{orderedContents.map((content) => renderContent(content))}</div>
    </div>
    )
}