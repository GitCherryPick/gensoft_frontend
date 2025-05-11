"use client"

import { useState } from "react"
import Modal from "@/components/core/Modal"
import { Bold, Italic, Underline } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import { createTextContent } from "@/lib/content/content-service"

export default function ModalWriteContent({
  isOpen,
  onClose,
  onSave,
  initialContent = "",
  moduleTitle = "",
  moduleId,
}) {
  const [content, setContent] = useState(initialContent)
  const [title, setTitle] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("El contenido no puede estar vacío")
      return
    }

    if (!title.trim()) {
      toast.error("El título no puede estar vacío")
      return
    }

    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (!moduleId) {
        throw new Error("ID del módulo no proporcionado")
      }

      const contentData = {
        module_id: moduleId,
        content: content,
        title: title.trim(),
      }

      const savedContent = await createTextContent(contentData)

      toast.success("Contenido guardado correctamente")

      if (onSave) {
        await onSave(savedContent)
      }

      onClose()
    } catch (error) {
      console.error("Error al guardar:", error)
      toast.error(error.message || "Error al guardar el contenido")
    } finally {
      setIsSaving(false)
    }
  }

  const handleFormatText = (command, value = null) => {
    document.execCommand(command, false, value)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={moduleTitle ? `Modulo: ${moduleTitle}` : "Escribir contenido"}
      description="Redacta contenido que será visible para los estudiantes en el curso"
      maxWidth="3xl"
      fullHeight={false}
    >
      <div className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="content-title" className="block text-sm font-medium text-light-3 mb-2">
            Título del contenido
          </label>
          <input
            id="content-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 text-light-1"
            required
          />
        </div>

        <div className="bg-gray-100 dark:bg-dark-2 rounded-t-md border border-gray-200 dark:border-gray-700 p-2 flex flex-wrap gap-1">
          <ToolbarButton icon={<Bold size={18} />} onClick={() => handleFormatText("bold")} tooltip="Negrita" />
          <ToolbarButton icon={<Italic size={18} />} onClick={() => handleFormatText("italic")} tooltip="Cursiva" />
          <ToolbarButton
            icon={<Underline size={18} />}
            onClick={() => handleFormatText("underline")}
            tooltip="Subrayado"
          />
        </div>

        <div
          className="flex-1 p-4 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-md bg-white dark:bg-dark-1 overflow-y-auto focus:outline-none"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => {
            setContent(e.currentTarget.innerHTML)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              document.execCommand("insertParagraph", false)
              e.preventDefault()
            }
          }}
          onPaste={(e) => {
            e.preventDefault()
            const text = e.clipboardData.getData("text/plain")
            document.execCommand("insertText", false, text)
          }}
          style={{ minHeight: "150px", maxHeight: "200px" }}
          ref={(el) => {
            if (el && !el.innerHTML && initialContent) {
              el.innerHTML = initialContent
            }
          }}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-2 transition-colors"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-cta-1 text-black hover:bg-opacity-90 transition-colors"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </Modal>
  )
}

function ToolbarButton({ icon, onClick, tooltip, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors", className)}
      title={tooltip}
    >
      {icon}
    </button>
  )
}
