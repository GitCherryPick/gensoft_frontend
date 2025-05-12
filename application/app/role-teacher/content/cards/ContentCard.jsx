"use client"

import { Trash2 } from "lucide-react"

export default function ContentCard({ content, onDelete }) {
  // Crear una copia del objeto content para mostrar, excluyendo propiedades internas
  const displayContent = { ...content }

  // Eliminar propiedades internas que comienzan con "_" si existen
  Object.keys(displayContent).forEach((key) => {
    if (key.startsWith("_")) {
      delete displayContent[key]
    }
  })

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">Contenido: {content.content_type}</h4>
        <button
          onClick={() => onDelete(content.id)}
          className="p-1.5 rounded-md text-light-3 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
          aria-label="Eliminar contenido"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-2 p-3 bg-gray-100 dark:bg-dark-2 rounded-md overflow-auto">
        <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(displayContent, null, 2)}</pre>
      </div>
    </div>
  )
}
