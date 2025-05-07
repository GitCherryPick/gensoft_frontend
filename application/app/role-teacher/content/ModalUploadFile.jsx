"use client"

import { useState } from "react"
import { FileText, Video, ImageIcon, File, Upload } from "lucide-react"
import Modal from "@/components/core/Modal"

export default function ModalUploadFile({
  isOpen,
  onClose,
  onUpload,
  title = "Subir archivo",
  description = "Selecciona el tipo de archivo que deseas subir y arrastra el archivo o haz clic para seleccionarlo.",
  maxWidth = "2xl",
  maxHeight = "90vh",
}) {
  const [activeTab, setActiveTab] = useState("pdf")

  const handleFileUpload = (type, file) => {
    if (onUpload) {
      onUpload(type, file)
    }
    onClose()
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
          <FileUploadZone type={activeTab} onUpload={(type, file) => handleFileUpload(type, file)} />
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

function FileUploadZone({ type, onUpload }) {
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
        <p className="text-sm text-light-3">Acepta archivos {acceptedTypesText[type]} (máx. 10MB)</p>
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
