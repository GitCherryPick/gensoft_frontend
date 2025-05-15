"use client"

import { useState } from "react"
import { FileText, Video, ImageIcon, File, Upload } from "lucide-react"
import Modal from "@/components/core/Modal"
import {
  uploadPdfContent,
  uploadImageContent,
  uploadVideoContent,
  uploadSlideContent,
} from "@/lib/content/content-service"
import toast from "react-hot-toast"

export default function ModalUploadFile({
  isOpen,
  onClose,
  onUpload,
  title = "Subir archivo",
  description = "Selecciona el tipo de archivo que deseas subir y arrastra el archivo o haz clic para seleccionarlo.",
  maxWidth = "2xl",
  maxHeight = "90vh",
  moduleId,
}) {
  const [activeTab, setActiveTab] = useState("pdf")
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (type, file) => {
    if (!file) {
      toast.error("No se ha seleccionado ningún archivo")
      return
    }

    if (!moduleId) {
      toast.error("ID del módulo no proporcionado")
      return
    }

    setIsUploading(true)
    setFileName(file.name)

    // Simulamos progreso de carga
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress > 90 ? 90 : newProgress
      })
    }, 300)

    try {
      let newContent

      // Usar la función específica según el tipo de archivo
      switch (type) {
        case "pdf":
          newContent = await uploadPdfContent(file, moduleId)
          break
        case "image":
          newContent = await uploadImageContent(file, moduleId)
          break
        case "video":
          newContent = await uploadVideoContent(file, moduleId)
          break
        case "slide":
          newContent = await uploadSlideContent(file, moduleId)
          break
        default:
          throw new Error("Tipo de archivo no soportado")
      }

      // Completar el progreso
      setUploadProgress(100)

      // Pequeña pausa para mostrar el 100%
      await new Promise((resolve) => setTimeout(resolve, 300))

      toast.success(`Archivo ${file.name} subido correctamente`)

      if (onUpload) {
        onUpload(type, newContent)
      }

      onClose()
    } catch (error) {
      console.error("Error al subir el archivo:", error)
      toast.error(error.message || "Error al subir el archivo")
    } finally {
      clearInterval(progressInterval)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Información sobre límites de tamaño por tipo
  const sizeInfo = {
    pdf: "10MB",
    image: "5MB",
    video: "100MB",
    slide: "20MB",
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      fullHeight={true}
    >
      <div className="overflow-hidden rounded-lg bg-dark-1 flex flex-col flex-1">
        <div className="flex">
          <TabButton
            icon={<File className="h-5 w-5" />}
            label="PDF"
            isActive={activeTab === "pdf"}
            onClick={() => setActiveTab("pdf")}
          />
          <TabButton
            icon={<ImageIcon className="h-5 w-5" />}
            label="Imagen"
            isActive={activeTab === "image"}
            onClick={() => setActiveTab("image")}
          />
          <TabButton
            icon={<Video className="h-5 w-5" />}
            label="Video"
            isActive={activeTab === "video"}
            onClick={() => setActiveTab("video")}
          />
          <TabButton
            icon={<FileText className="h-5 w-5" />}
            label="Slide"
            isActive={activeTab === "slide"}
            onClick={() => setActiveTab("slide")}
          />
        </div>

        <div className="p-8 flex-1 flex">
          <FileUploadZone
            type={activeTab}
            onUpload={(type, file) => handleFileUpload(type, file)}
            isUploading={isUploading}
            fileName={fileName}
            progress={uploadProgress}
            maxSize={sizeInfo[activeTab]}
          />
        </div>
      </div>
    </Modal>
  )
}

function TabButton({ icon, label, isActive, onClick }) {
  return (
    <button
      className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 transition-colors ${
        isActive ? "bg-dark-1 text-cta-1 border-b-2 border-cta-1" : "text-light-3 hover:text-light-2"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function FileUploadZone({ type, onUpload, isUploading, fileName, progress, maxSize }) {
  const acceptedTypes = {
    pdf: ".pdf",
    image: ".jpg, .jpeg, .png, .gif",
    video: ".mp4, .webm, .ogg",
    slide: ".ppt, .pptx, .pdf",
  }

  const acceptedTypesText = {
    pdf: "PDF",
    image: "JPG, PNG, GIF",
    video: "MP4, WEBM, OGG",
    slide: "PPT, PPTX, PDF",
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length) {
      onUpload(type, files[0])
    }
  }

  if (isUploading) {
    return (
      <div className="border-2 border-dashed border-cta-1/30 dark:border-cta-1/20 rounded-lg p-10 text-center flex-1 flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="w-20 h-20 bg-cta-1/10 rounded-full flex items-center justify-center mb-6">
            <div className="w-10 h-10 border-4 border-cta-1 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xl font-medium mb-4 text-light-1">Subiendo archivo...</p>
          <p className="text-light-3 mb-6 text-base">{fileName}</p>

          {/* Barra de progreso */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-cta-1 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-light-3 text-sm">{Math.round(progress)}% completado</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="border-2 border-dashed border-cta-1/30 dark:border-cta-1/20 rounded-lg p-10 text-center cursor-pointer hover:bg-dark-1/50 transition-colors flex-1 flex flex-col items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById(`file-upload-${type}`).click()}
    >
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-cta-1/10 rounded-full flex items-center justify-center mb-6">
          <Upload className="w-10 h-10 text-cta-1" />
        </div>
        <p className="text-xl font-medium mb-4 text-light-1">Arrastra y suelta tu archivo aquí</p>
        <p className="text-light-3 mb-6 text-base">o haz clic para seleccionar un archivo</p>
        <p className="text-sm text-light-3">
          Acepta archivos {acceptedTypesText[type]} (máx. {maxSize})
        </p>
      </div>
      <input
        id={`file-upload-${type}`}
        type="file"
        accept={acceptedTypes[type]}
        className="hidden"
        onChange={(e) => {
          if (e.target.files.length) {
            onUpload(type, e.target.files[0])
          }
        }}
      />
    </div>
  )
}
