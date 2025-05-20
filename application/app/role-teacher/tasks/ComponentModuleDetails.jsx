"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getContentByModuleId, deleteContent } from "@/lib/content/content-service"
import Spinner from "@/components/core/Spinner"
import ErrorMessage from "@/components/core/ErrorMessage"
import ActionButton from "@/components/core/ActionButton"
import ModalUploadFile from "@/app/role-teacher/content/ModalUploadFile"
import ModalWriteContent from "@/app/role-teacher/content/ModalWriteContent"
import ModalEditDescription from "@/app/role-teacher/content/ModalEditDescription"
import { Edit, PenSquare, Upload } from "lucide-react"
import toast from "react-hot-toast"
import ComponentContentList from "@/app/role-teacher/content/ComponentContentList"

export default function ComponentModuleDetails({ module }) {
  const [contents, setContents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showWriteContentModal, setShowWriteContentModal] = useState(false)
  const [showEditDescriptionModal, setShowEditDescriptionModal] = useState(false)
  const [moduleData, setModuleData] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

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

  const handleFileUpload = (type, newContent) => {
    console.log(`Archivo de tipo ${type} subido:`, newContent)
    setContents((prev) => [...prev, newContent])
    // Incrementar el refreshTrigger para forzar la recarga de la lista
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleSaveContent = async (newContent) => {
    console.log("Contenido guardado:", newContent)
    setContents((prev) => [...prev, newContent])
    // Incrementar el refreshTrigger para forzar la recarga de la lista
    setRefreshTrigger((prev) => prev + 1)
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

  const handleDeleteContent = async (contentId) => {
    try {
      await deleteContent(contentId)
      setContents((prev) => prev.filter((content) => content.id !== contentId))
      // Incrementar el refreshTrigger para forzar la recarga de la lista
      setRefreshTrigger((prev) => prev + 1)
      toast.success("Contenido eliminado correctamente")
    } catch (error) {
      console.error("Error al eliminar contenido:", error)
      toast.error(error.message || "Error al eliminar el contenido")
    }
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
        ) : (
          <ComponentContentList
            moduleId={moduleData.id}
            onContentChange={(newContents) => setContents(newContents)}
            refreshTrigger={refreshTrigger}
          />
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
        moduleId={moduleData.id}
      />

      <ModalWriteContent
        isOpen={showWriteContentModal}
        onClose={() => setShowWriteContentModal(false)}
        onSave={handleSaveContent}
        moduleTitle={moduleData.title}
        moduleId={moduleData.id}
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
