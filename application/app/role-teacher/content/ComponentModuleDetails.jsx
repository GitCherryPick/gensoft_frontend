"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getContentByModuleId } from "@/lib/content/content-service"
import Spinner from "@/components/core/Spinner"
import ErrorMessage from "@/components/core/ErrorMessage"
import ActionButton from "@/components/core/ActionButton"
import ModalUploadFile from "./ModalUploadFile"
import ModalWriteContent from "./ModalWriteContent"
import ModalEditDescription from "./ModalEditDescription"
import { FileText, Video, ImageIcon, File, Edit, PenSquare, Upload } from "lucide-react"
import toast from "react-hot-toast"

export default function ComponentModuleDetails({ module }) {
  const [contents, setContents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showWriteContentModal, setShowWriteContentModal] = useState(false)
  const [showEditDescriptionModal, setShowEditDescriptionModal] = useState(false)
  const [moduleData, setModuleData] = useState(null)

  useEffect(() => {
    if (module) {
      setModuleData({ ...module })
    }
  }, [module])

  useEffect(() => {
    let isMounted = true

    async function loadContents() {
      if (!module) return

      setIsLoading(true)
      setError(null)

      try {
        const moduleContents = await getContentByModuleId(module.id)
        if (isMounted) {
          setContents(moduleContents)
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error al cargar contenidos:", err)
          setError("Error al cargar contenidos")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadContents()

    return () => {
      isMounted = false
    }
  }, [module])

  const handleFileUpload = (type, file) => {
    toast.success(`Subiendo archivo de tipo: ${type}`)
    console.log("Archivo:", file)
  }

  const handleSaveContent = async (content) => {
    console.log("Contenido guardado:", content)

    const newContent = {
      id: Date.now(),
      module_id: module.id,
      content_type: "Text",
      title: "Nuevo contenido",
      content: content,
      created_at: new Date(),
    }

    setContents((prev) => [...prev, newContent])
    return true
  }

  const handleSaveDescription = async (description) => {
    console.log("Descripción guardada:", description)

    setModuleData((prev) => ({
      ...prev,
      description: description,
    }))

    toast.success("Descripción actualizada correctamente")
    return true
  }

  if (!module || !moduleData) {
    return (
      <div className="h-full w-full flex items-center justify-center text-light-3">
        <p>Selecciona un módulo para ver sus detalles</p>
      </div>
    )
  }

  return (
    <motion.div
      className="h-full w-full p-6 overflow-auto scrollbar-hide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 pb-6 border-b border-cta-1/30 dark:border-cta-1/20">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold">{moduleData.title}</h2>
          <button
            className="p-2 rounded-md text-light-3 hover:bg-gray-100 dark:hover:bg-dark-2 transition-colors"
            aria-label="Editar descripción del módulo"
            onClick={() => setShowEditDescriptionModal(true)}
          >
            <Edit size={18} />
          </button>
        </div>
        <div
          className="text-light-2"
          dangerouslySetInnerHTML={{ __html: moduleData.description || "Sin descripción" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <ActionButton
          icon={<PenSquare size={18} />}
          text="Escribir contenido"
          onClick={() => setShowWriteContentModal(true)}
        />

        <ActionButton icon={<Upload size={18} />} text="Subir archivo" onClick={() => setShowUploadModal(true)} />
      </div>

      <div>
        {isLoading ? (
          <div className="py-8 flex justify-center">
            <Spinner size="md" />
          </div>
        ) : error ? (
          <div className="py-8">
            <ErrorMessage message="Error al cargar contenidos" />
          </div>
        ) : contents.length === 0 ? (
          <div className="py-8 text-center text-light-3">
            <p>Este módulo no tiene contenidos</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contents.map((content) => (
              <ContentItem key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>

      <ModalUploadFile
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleFileUpload}
        title={`Subir recurso para: ${moduleData.title}`}
        description="Sube archivos para enriquecer el contenido de este módulo. Puedes subir documentos PDF, imágenes, videos o presentaciones."
        maxWidth="3xl"
        maxHeight="80vh"
      />

      <ModalWriteContent
        isOpen={showWriteContentModal}
        onClose={() => setShowWriteContentModal(false)}
        onSave={handleSaveContent}
        moduleTitle={moduleData.title}
      />

      <ModalEditDescription
        isOpen={showEditDescriptionModal}
        onClose={() => setShowEditDescriptionModal(false)}
        onSave={handleSaveDescription}
        initialDescription={moduleData.description || ""}
        moduleTitle={moduleData.title}
      />
    </motion.div>
  )
}

function ContentItem({ content }) {
  const getContentIcon = () => {
    switch (content.content_type) {
      case "Text":
        return <FileText className="h-5 w-5 text-blue-400" />
      case "Video":
        return <Video className="h-5 w-5 text-red-400" />
      case "Image":
        return <ImageIcon className="h-5 w-5 text-green-400" />
      default:
        return <File className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:bg-gray-50 dark:hover:bg-dark-2 transition-colors">
      <div className="flex items-start gap-3">
        <div className="mt-1">{getContentIcon()}</div>
        <div className="flex-1">
          <h4 className="font-medium mb-1">{content.title}</h4>

          {content.content_type === "Text" && content.content && (
            <div className="mt-2 p-3 bg-gray-100 dark:bg-dark-2 rounded-md">
              <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: content.content }}></div>
            </div>
          )}

          {content.content_type === "Video" && content.video_url && (
            <div className="mt-2">
              <p className="text-sm text-light-3">URL del video: {content.video_url}</p>
            </div>
          )}

          {content.content_type === "Image" && content.file_path && (
            <div className="mt-2">
              <p className="text-sm text-light-3">Ruta de la imagen: {content.file_path}</p>
            </div>
          )}

          {content.content_type === "PDF" && content.file_path && (
            <div className="mt-2">
              <p className="text-sm text-light-3">Ruta del PDF: {content.file_path}</p>
            </div>
          )}

          <div className="mt-2 text-xs text-light-3">Creado: {new Date(content.created_at).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
