"use client"
import { useEffect, useState } from "react"
import SubmissionCard from "./SubmissionCard"
import { SANDBOX_API_BASE_URL } from "../../../lib/sandbox/sandbox-api-config"

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${SANDBOX_API_BASE_URL}/submissions`)
        const data = await response.json()
        setSubmissions(data)
      } catch (error) {
        console.error("Error fetching submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Entregas</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-gray-50">
          <p className="text-gray-600">No tienes entregas aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </div>
  )
}