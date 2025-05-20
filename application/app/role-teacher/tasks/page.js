"use client"
import { useState } from "react"
import Layout from "./Layout"
import ComponentModuleList from "./ComponentModuleList"
import ComponentModuleDetails from "./ComponentModuleDetails"
import EmptyState from "@/components/core/EmptyState"
import ComponentCreateTask from "./ComponentCreateTask"

export default function TasksPage() {
  const [selectedModule, setSelectedModule] = useState(null)

  return (
    <div className="h-full w-full">
      {/* <Layout
        leftPanel={<ComponentModuleList onModuleSelect={setSelectedModule} />}
        rightPanel={selectedModule ? <ComponentModuleDetails module={selectedModule} /> : <EmptyState />}
        defaultLeftSize={35}
        defaultRightSize={65}
      /> */}
      <ComponentCreateTask />
    </div>
  )
}