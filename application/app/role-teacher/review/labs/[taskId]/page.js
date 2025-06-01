"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTaskById, getSubmissionsByTaskId } from "@/lib/sandbox/sandbox-service";

export default function ReviewLabsConcrete() {
  const params = useParams();
  const taskId = params?.taskId;
  const [task, setTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskDetails = await getTaskById(taskId);
        const taskSubmissions = await getSubmissionsByTaskId(taskId);
        console.log("hola",taskDetails)
        setTask(taskDetails);
        setSubmissions(taskSubmissions);
        console.log("hola2",taskSubmissions)
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    
    if (taskId) {
      fetchData();
    }
  }, [taskId]);

  if (!task) return <div>Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p className="text-sm text-gray-500">{task.description}</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Entregas</h2>
      {submissions.length === 0 ? (
        <p>No hay entregas aun</p>
      ): (
        <ul className="list-disc pl-5 space-y-1">
          {submissions.map((submission) => (
            <li key={submission.id}>{submission.user_id}</li>
          ))}
        </ul>
      )
      }
    </div>
  )
}