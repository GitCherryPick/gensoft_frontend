"use client"

export default function ContentText({ content }) {
  if (!content || !content.content) {
    return null
  }

  return (
    <div className="mb-6">
      <div
        className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  )
}
