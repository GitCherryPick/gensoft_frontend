"use client"

import { useState } from "react"
import { X, ExternalLink } from "lucide-react"

export default function CardContentImage({ content, onDelete }) {
  const [imageError, setImageError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const getImageUrl = (filePath) => {
    if (!filePath) return null
    return `http://localhost:8003/${filePath}`
  }

  const imageUrl = getImageUrl(content.file_path)

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
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold py-1 px-2 z-10">IMAGEN</div>

        {!imageError && imageUrl ? (
          <img
            src={imageUrl || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <p className="text-gray-500">Imagen no disponible</p>
          </div>
        )}

        {isHovering && (
          <button
            onClick={() => onDelete(content.id)}
            className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
            aria-label="Eliminar imagen"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex justify-between items-center text-xs px-1">
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-cta-1 hover:underline truncate max-w-[70%]"
          title={imageUrl}
        >
          <ExternalLink size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate">Abrir imagen</span>
        </a>

        <span className="text-light-3">{formatDate(content.created_at)}</span>
      </div>
    </div>
  )
}
