"use client"

import { useState } from "react"
import MarkdownEditor from "@/components/core/markdown-editor"
import MarkdownPreview from "@/components/core/markdown-preview"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function MarkdownEditorWithPreview({ initialContent = "" }) {
  const [markdown, setMarkdown] = useState(initialContent)

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-1">
            <MarkdownEditor markdown={markdown} onChange={setMarkdown} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-1">
            <MarkdownPreview markdown={markdown} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
