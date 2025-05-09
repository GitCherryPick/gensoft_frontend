"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { getFullFileUrl } from "@/lib/content/content-service"

export default function CardContentImage({ content, onDelete }) {
  const [imageError, setImageError] = useState(false)

  // Extraer el nombre del archivo de la ruta
  const getFileName = (filePath) => {
    if (!filePath) return "Imagen"
    const parts = filePath.split("/")
    return parts[parts.length - 1]
  }

  const imageUrl = getFullFileUrl(content.file_path)

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{content.title || getFileName(content.file_path)}</h4>
        <button
          onClick={() => onDelete(content.id)}
          className="p-1.5 rounded-md text-light-3 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
          aria-label="Eliminar contenido"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-2">
        {!imageError && imageUrl ? (
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={content.title || "Imagen"}
            className="w-full rounded-md max-h-48 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Imagen no disponible</p>
          </div>
        )}
        <p className="text-sm mt-1">{getFileName(content.file_path)}</p>
      </div>

      <div className="mt-2 text-xs text-light-3">Creado: {new Date(content.created_at).toLocaleString()}</div>
    </div>
  )
}
