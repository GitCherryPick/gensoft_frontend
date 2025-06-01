"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewLabsConcrete() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const taskDetails = await getTaskById(taskId);
        const taskSubmissions = await getSubmissionsByTaskId(taskId);
        setTask(taskDetails);
        setSubmissions(taskSubmissions);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    fetchData();   
  },[taskId]);

  if (!task) return <div>Cargando...</div>;

  return (
    
  )
}