import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import EditorComponent from "./editor-component"
import ResourcesComponent from "./resources-component"

export default function ProblemsPage() {
  return (
    <div className="h-full w-full relative">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={60} minSize={30}>
          <EditorComponent />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40} minSize={20}>
          <ResourcesComponent />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
