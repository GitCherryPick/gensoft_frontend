"use client"

import { useState } from "react"
import Modal from "@/components/core/Modal"
import { Bold, Italic, Underline } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

export default function ModalEditDescription({ isOpen, onClose, onSave, initialDescription = "", moduleTitle = "" }) {
  const [description, setDescription] = useState(initialDescription)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!description.trim()) {
      toast.error("La descripción no puede estar vacía")
      return
    }

    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (onSave) {
        await onSave(description)
      }

      toast.success("Descripción guardada correctamente")
      onClose()
    } catch (error) {
      console.error("Error al guardar:", error)
      toast.error("Error al guardar la descripción")
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
      title={moduleTitle ? `Editar descripción: ${moduleTitle}` : "Editar descripción"}
      description="Modifica la descripción del módulo utilizando las herramientas de formato"
      maxWidth="2xl"
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
          className="p-4 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-md bg-white dark:bg-dark-1 overflow-y-auto focus:outline-none"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => {
            setDescription(e.currentTarget.innerHTML)
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
          style={{ minHeight: "120px", maxHeight: "200px" }}
          ref={(el) => {
            if (el && !el.innerHTML && initialDescription) {
              el.innerHTML = initialDescription
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
