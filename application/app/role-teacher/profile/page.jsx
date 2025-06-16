"use client"

import { useState } from "react"
import ProfileHeader from "./components/ProfileHeader"
import ProfileSidebar from "./components/ProfileSidebar"
import ProfileContent from "./components/ProfileContent"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TeacherProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">

        <div className="mb-6">
          <ProfileHeader />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-200px)]">
          <div className="md:h-full">
            <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="h-full overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="pr-4 pb-8">
                <ProfileContent activeTab={activeTab} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}