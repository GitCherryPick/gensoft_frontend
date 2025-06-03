"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTaskById, getSubmissionsByTaskId, endTask } from "@/lib/sandbox/sandbox-service";
import StudentPanel from "./StudentPanel.jsx"
import Button from "@/components/core/Button.jsx";
import toast from "react-hot-toast";

export default function ReviewLabsConcrete() {
  const params = useParams();
  const taskId = params?.taskId;
  const [task, setTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskDetails = await getTaskById(taskId);
        console.log(taskDetails);
        const taskSubmissions = await getSubmissionsByTaskId(taskId);
        console.log(taskSubmissions);
        const lastSubmissionsByUser = {};
        if(taskSubmissions.length > 0) {
          taskSubmissions.forEach((s) => {
            lastSubmissionsByUser[s.user_id] = s;
          });
        }
        setSubmissions(Object.values(lastSubmissionsByUser));
        setTask(taskDetails);

      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    if (taskId) {
      fetchData();
    }
  }, [taskId]);

  const handleEndTask = async () => {
    const response = await endTask(task.id);
    console.log(response);
    if (response.message == "Tarea cerrada y envíos generados para estudiantes sin envíos previos") {
      toast.success("Tarea cerrada exitosamente");
    } else {
      toast.error("Error al cerrar la tarea");
    }
  }

  if (!task) return <div className="p-6 text-gray-600">Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-5">{task.title}</h1>
      <div className="flex justify-between content-center mb-5">
        <p className="text-gray-500 self-center">{task.enunciado}</p>
        <Button onClick={handleEndTask} className="sm:w-auto hover:bg-violet-500 hover:text-white">
          Cerrar tarea
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Entregas de estudiantes</h2>

      <div className="mb-16">
        {submissions.length === 0 ? (
          <p className="text-gray-600">No hay entregas aún.</p>
        ) : (
          <StudentPanel students={submissions} taskInfo={task.grade}/>
       
      )}
    </div>
    </div>
  );
}
