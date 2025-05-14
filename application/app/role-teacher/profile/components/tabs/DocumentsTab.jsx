"use client"

import { useState } from "react"
import { FileText, Download, Upload, Trash2, Eye, Plus } from 'lucide-react'

export default function DocumentsTab() {
  const [isEditing, setIsEditing] = useState(false)

  // Datos de ejemplo
  const documents = [
    {
      id: 1,
      name: "Curriculum Vitae",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "15/01/2023",
      category: "Personal",
    },
    {
      id: 2,
      name: "Título Doctorado",
      type: "PDF",
      size: "3.5 MB",
      uploadDate: "10/02/2023",
      category: "Académico",
    },
    {
      id: 3,
      name: "Certificado de Idiomas",
      type: "PDF",
      size: "0.8 MB",
      uploadDate: "05/03/2023",
      category: "Certificación",
    },
    {
      id: 4,
      name: "Publicaciones Académicas",
      type: "DOCX",
      size: "1.7 MB",
      uploadDate: "20/04/2023",
      category: "Investigación",
    },
    {
      id: 5,
      name: "Programa de Asignatura",
      type: "PDF",
      size: "2.1 MB",
      uploadDate: "12/05/2023",
      category: "Docencia",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-1">Documentos</h2>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1.5 bg-dark-3 text-light-1 rounded-md text-sm">
            <Upload size={16} className="mr-1" />
            Subir documento
          </button>
          <button
            className="px-3 py-1.5 bg-cta-1 text-black rounded-md text-sm font-medium"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Guardar cambios" : "Gestionar"}
          </button>
        </div>
      </div>

      <div className="bg-dark-1 rounded-lg border border-dark-3 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-dark-3 text-sm font-medium text-light-2">
          <div className="col-span-5">Nombre</div>
          <div className="col-span-2">Tipo</div>
          <div className="col-span-2">Tamaño</div>
          <div className="col-span-2">Fecha</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-dark-3">
          {documents.map((doc) => (
            <div key={doc.id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center text-sm">
              <div className="col-span-5 flex items-center">
                <FileText size={16} className="mr-2 text-light-3" />
                <span className="text-light-1">{doc.name}</span>
              </div>
              <div className="col-span-2 text-light-3">{doc.type}</div>
              <div className="col-span-2 text-light-3">{doc.size}</div>
              <div className="col-span-2 text-light-3">{doc.uploadDate}</div>
              <div className="col-span-1 flex justify-end space-x-2">
                {isEditing ? (
                  <button className="text-light-3 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <>
                    <button className="text-light-3 hover:text-light-1">
                      <Eye size={16} />
                    </button>
                    <button className="text-light-3 hover:text-light-1">
                      <Download size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías de documentos */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium text-light-2">Categorías</h3>
          {isEditing && (
            <button className="flex items-center text-sm text-cta-1">
              <Plus size={16} className="mr-1" />
              Añadir categoría
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Personal", "Académico", "Certificación", "Investigación", "Docencia"].map((category) => (
            <div
              key={category}
              className="bg-dark-1 rounded-md border border-dark-3 p-3 flex justify-between items-center"
            >
              <span className="text-light-1">{category}</span>
              {isEditing && (
                <button className="text-light-3 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}