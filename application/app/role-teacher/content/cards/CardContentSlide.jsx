"use client"

import { useState } from "react"
import { X, FileIcon as FilePresentation, ExternalLink } from "lucide-react"

export default function CardContentSlide({ content, onDelete }) {
  const [isHovering, setIsHovering] = useState(false)

  const getSlideUrl = (filePath) => {
    if (!filePath) return null
    const { CONTENT_API_BASE_URL } = require('@/lib/content/content-api-config');
    return `${CONTENT_API_BASE_URL}/${filePath}`
  }

  const slideUrl = getSlideUrl(content.file_path)

  const getFileName = (filePath) => {
    if (!filePath) return "Presentación"
    const parts = filePath.split("/")
    return parts[parts.length - 1]
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-2">
      <div
        className="relative overflow-hidden rounded-xl h-64"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold py-1 px-2 z-10">SLIDE</div>

        <div className="w-full h-full bg-gray-100 dark:bg-dark-2 flex flex-col items-center justify-center">
          <FilePresentation size={48} className="text-amber-500 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300 px-4 text-center truncate max-w-full">
            {getFileName(content.file_path)}
          </p>
        </div>

        {isHovering && (
          <button
            onClick={() => onDelete(content.id)}
            className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors z-10"
            aria-label="Eliminar presentación"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex justify-between items-center text-xs px-1">
        <a
          href={slideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-cta-1 hover:underline truncate max-w-[70%]"
          title={slideUrl}
        >
          <ExternalLink size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate">Abrir presentación</span>
        </a>

        <span className="text-light-3">{formatDate(content.created_at)}</span>
      </div>
    </div>
  )
}
