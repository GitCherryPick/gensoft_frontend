"use client"
import { useState } from "react"
import Layout from "./Layout"
import ComponentContentList from "./ComponentContentList"
import ComponentModuleDetails from "./ComponentModuleDetails"
import EmptyState from "@/components/core/EmptyState"

export default function ContentPage() {
  const [selectedModule, setSelectedModule] = useState(null)

  return (
    <div className="h-full w-full">
      <Layout
        leftPanel={<ComponentContentList onModuleSelect={setSelectedModule} />}
        rightPanel={selectedModule ? <ComponentModuleDetails module={selectedModule} /> : <EmptyState />}
        defaultLeftSize={35}
        defaultRightSize={65}
      />
    </div>
  )
}
