"use client"

import { useState } from "react"
import ProfileHeader from "./components/ProfileHeader"
import ProfileSidebar from "./components/ProfileSidebar"
import ProfileContent from "./components/ProfileContent"

export default function TeacherProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <ProfileHeader />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <ProfileContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}