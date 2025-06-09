"use client"

import { useState, useRef } from "react"
import { X, Play, ExternalLink, Pause } from "lucide-react"

export default function CardContentVideo({ content, onDelete }) {
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef(null)

  const getVideoUrl = (filePath) => {
    if (!filePath) return null
    const { CONTENT_API_BASE_URL } = require('@/lib/content/content-api-config');
    return `${CONTENT_API_BASE_URL}/${filePath}`
  }

  const videoUrl = getVideoUrl(content.file_path)

  const getFileName = (filePath) => {
    if (!filePath) return "Video"
    const parts = filePath.split("/")
    return parts[parts.length - 1]
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="space-y-2">
      <div
        className="relative overflow-hidden rounded-xl h-64"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold py-1 px-2 z-10">VIDEO</div>

        {!videoError && videoUrl ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlayPause}
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
              onClick={togglePlayPause}
              style={{ opacity: isPlaying ? 0 : 1 }}
            >
              <div className="bg-black bg-opacity-50 rounded-full p-3">
                {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-dark-2 flex flex-col items-center justify-center">
            <Play size={48} className="text-green-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300 px-4 text-center truncate max-w-full">
              {videoError ? "Error al cargar el video" : getFileName(content.file_path)}
            </p>
          </div>
        )}
        {isHovering && (
          <button
            onClick={() => onDelete(content.id)}
            className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors z-10"
            aria-label="Eliminar video"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="flex justify-between items-center text-xs px-1">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-cta-1 hover:underline truncate max-w-[70%]"
          title={videoUrl}
        >
          <ExternalLink size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate">Abrir video</span>
        </a>
        <span className="text-light-3">{formatDate(content.created_at)}</span>
      </div>
    </div>
  )
}
