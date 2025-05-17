"use client"
import { useState, useEffect } from "react"
import { getContentByModuleId } from "@/lib/content/content-service"

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

  if (isLoading) return <div>Cargando contenidos...</div>
  if (error) return <div>Error: {error}</div>
  if (!moduleId) return <div>Seleccione un módulo para ver sus contenidos</div>
  if (contents.length === 0) return <div>Este módulo no tiene contenidos</div>

  return (
    <div className="w-full max-w-full">
      <div className="space-y-2">
        {contents.map((content) => (
          <div key={content.id} className="border border-gray-200 dark:border-gray-700 rounded">
            <pre className="text-xs overflow-x-auto p-2 max-w-full whitespace-pre-wrap break-words">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
