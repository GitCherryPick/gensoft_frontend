"use client"
import { cn } from "@/lib/utils"

/**
 * Componente de botón de acción con borde punteado
 *
 * @param {React.ReactNode} icon - Icono a mostrar en el botón
 * @param {string} text - Texto del botón
 * @param {Function} onClick - Función a ejecutar al hacer clic
 * @param {string} className - Clases adicionales
 * @param {boolean} disabled - Si el botón está deshabilitado
 */
export default function ActionButton({ icon, text, onClick, className, disabled = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-4 rounded-md border border-dashed border-gray-300 dark:border-gray-700",
        "hover:bg-gray-100 dark:hover:bg-dark-1 transition-colors",
        "flex items-center justify-center gap-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
        className,
      )}
      {...props}
    >
      {icon && <span className="text-light-3">{icon}</span>}
      {text && <span className="text-light-3">{text}</span>}
    </button>
  )
}
