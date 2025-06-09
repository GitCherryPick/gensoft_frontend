"use client"
import { useState } from "react"

export default function ContentPDF({ content }) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  if (!content || !content.file_path) {
    return null
  }

  const { CONTENT_API_BASE_URL } = require('@/lib/content/content-api-config');
  const pdfUrl = `${CONTENT_API_BASE_URL}${content.file_path.startsWith("/") ? "" : "/"}${content.file_path}`

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  return (
    <div className="mb-8">
      {content.title && <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">{content.title}</h3>}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg mx-auto w-[90%] max-w-4xl">
        {isLoading && (
          <div className="flex justify-center items-center h-16 bg-gray-50 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
          </div>
        )}

        <div className={`${isLoading ? "hidden" : "block"}`}>
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            className="w-full h-[500px]"
            onLoad={handleLoad}
            onError={handleError}
            title={content.title || "Documento PDF"}
          ></iframe>
        </div>

        {error && (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-300 mb-4">No se pudo cargar el documento PDF</p>
          </div>
        )}

        {/* Barra de acciones para el PDF */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">{content.title || "Documento PDF"}</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-600 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Abrir PDF
          </a>
        </div>
      </div>
    </div>
  )
}
