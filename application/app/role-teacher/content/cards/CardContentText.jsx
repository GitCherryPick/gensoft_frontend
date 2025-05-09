"use client"

import { Trash2 } from "lucide-react"

export default function CardContentText({ content, onDelete }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{content.title || "Contenido de texto"}</h4>
        <button
          onClick={() => onDelete(content.id)}
          className="p-1.5 rounded-md text-light-3 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
          aria-label="Eliminar contenido"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {content.content && (
        <div className="mt-2 p-3 bg-gray-100 dark:bg-dark-2 rounded-md">
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: content.content }}></div>
        </div>
      )}

      <div className="mt-2 text-xs text-light-3">Creado: {new Date(content.created_at).toLocaleString()}</div>
    </div>
  )
}
