"use client"

import { Trash2 } from "lucide-react"
import { getFullFileUrl } from "@/lib/content/content-service"

export default function CardContentSlide({ content, onDelete }) {
  // Extraer el nombre del archivo de la ruta
  const getFileName = (filePath) => {
    if (!filePath) return "Presentación"
    const parts = filePath.split("/")
    return parts[parts.length - 1]
  }

  const fileUrl = getFullFileUrl(content.file_path)

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
        <p className="text-sm">Presentación: {getFileName(content.file_path)}</p>
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm text-cta-1 hover:underline"
          >
            Ver presentación
          </a>
        )}
      </div>

      <div className="mt-2 text-xs text-light-3">Creado: {new Date(content.created_at).toLocaleString()}</div>
    </div>
  )
}
