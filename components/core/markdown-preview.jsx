"use client"

import { useEffect, useState } from "react"
import { marked } from "marked"

export default function MarkdownPreview({ markdown }) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
    })

    try {
      const rawHtml = marked.parse(markdown || "")
      setHtml(rawHtml)
    } catch (error) {
      console.error("Error parsing markdown:", error)
      setHtml("<p>Error rendering preview</p>")
    }
  }, [markdown])

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm h-full flex flex-col">
      <div className="p-2 border-b bg-gray-50 dark:bg-gray-700">
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Preview</h3>
      </div>
      <div
        className="markdown-preview p-4 prose dark:prose-invert max-w-none flex-grow overflow-auto scrollbar-hide"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
