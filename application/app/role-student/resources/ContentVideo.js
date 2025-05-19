"use client"
import { useState, useEffect } from "react"

export default function ContentVideo({ content }) {
  const [videoId, setVideoId] = useState(null)

  useEffect(() => {
    if (content?.video_url) {
      const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
      const match = content.video_url.match(youtubeRegex)

      if (match && match[1]) {
        setVideoId(match[1])
      }
    }
  }, [content])

  if (!content || !content.video_url) {
    return null
  }

  return (
    <div className="mb-8">
      {videoId ? (
        <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow-lg mx-auto w-[90%] ">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={content.title || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <a
            href={content.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Ver video externo
          </a>
        </div>
      )}
    </div>
  )
}
