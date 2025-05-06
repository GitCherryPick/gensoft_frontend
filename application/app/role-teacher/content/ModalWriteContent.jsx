"use client"

import { useState } from "react"
import Modal from "@/components/core/Modal"
import { Bold, Italic, Underline } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

export default function ModalWriteContent({ isOpen, onClose, onSave, initialContent = "", moduleTitle = "" }) {
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("El contenido no puede estar vacío")
      return
    }

    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (onSave) {
        await onSave(content)
      }

      toast.success("Contenido guardado correctamente")
      onClose()
    } catch (error) {
      console.error("Error al guardar:", error)
      toast.error("Error al guardar el contenido")
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
      title={moduleTitle ? `Escribir contenido: ${moduleTitle}` : "Escribir contenido"}
      description="Utiliza el editor para crear tu propio contenido"
      maxWidth="3xl"
      fullHeight={false}
    >
      <div className="flex flex-col">
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
          style={{ minHeight: "200px", maxHeight: "300px" }}
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

function ToolbarDivider() {
  return <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
}
