"use client"

import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function CardContentText({ content, onDelete }) {
  const [isHovering, setIsHovering] = useState(false)

  // Format the date (only date, no time)
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2 relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Simple title */}
      {content.title && <h4 className="font-medium text-light-1 mb-2">{content.title}</h4>}

      {/* Text content */}
      {content.content && (
        <div className="text-sm text-light-2" dangerouslySetInnerHTML={{ __html: content.content }}></div>
      )}

      {/* Subtle date indicator */}
      <div className="mt-2 text-xs text-light-3">{formatDate(content.created_at)}</div>

      {/* Delete button - only visible on hover */}
      {isHovering && (
        <button
          onClick={() => onDelete(content.id)}
          className="absolute top-0 right-0 p-1.5 rounded-md text-light-3 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
          aria-label="Eliminar contenido"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  )
}
