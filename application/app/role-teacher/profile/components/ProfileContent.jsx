"use client"

import PersonalInfoTab from "./tabs/PersonalInfoTab"
import AcademicInfoTab from "./tabs/AcademicInfoTab"
import CertificationsTab from "./tabs/CertificationsTab"
import ScheduleTab from "./tabs/ScheduleTab"
import DocumentsTab from "./tabs/DocumentsTab"
import SettingsTab from "./tabs/SettingsTab"

export default function ProfileContent({ activeTab }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoTab />
      case "academic":
        return <AcademicInfoTab />
      case "certifications":
        return <CertificationsTab />
      case "schedule":
        return <ScheduleTab />
      case "documents":
        return <DocumentsTab />
      case "settings":
        return <SettingsTab />
      default:
        return <PersonalInfoTab />
    }
  }

  return (
    <div className="bg-dark-2 rounded-xl border border-dark-3 overflow-hidden">
      <div className="p-6">{renderTabContent()}</div>
    </div>
  )
}