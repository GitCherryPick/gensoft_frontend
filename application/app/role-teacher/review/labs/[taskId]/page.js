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
          <StudentPanel students={submissions}/>
        // <div className="space-y-6">
        //   {submissions.map((submission) => (
        //     <div
        //       key={submission.submission_id}
        //       className="bg-white border rounded-lg p-4 shadow-sm"
        //     >
        //       <div className="flex items-center justify-between">
        //         <div>
        //           <p className="font-semibold text-lg">{submission.username}</p>
        //           <p className="text-sm text-gray-500">
        //             Entregado: {new Date(submission.submission_date).toLocaleString()}
        //           </p>
        //         </div>
        //         <div className={`px-3 py-1 rounded-full text-sm font-medium ${submission.result === "Accepted"
        //             ? "bg-green-100 text-green-800"
        //             : "bg-red-100 text-red-800"
        //           }`}>
        //           {submission.result}
        //         </div>
        //       </div>

        //       <div className="mt-4">
        //         <p className="text-sm text-gray-600 mb-1">Código enviado:</p>
        //         <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto whitespace-pre-wrap">
        //           {submission.code}
        //         </pre>
        //       </div>

        //       {submission.test_feedback && (
        //         <details className="mt-4">
        //           <summary className="cursor-pointer font-medium text-blue-600">
        //             Ver detalles de pruebas
        //           </summary>
        //           <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
        //             {submission.test_feedback.map((feedback, idx) => (
        //               <li key={idx}>
        //                 <strong>Input:</strong> {feedback.input} <br />
        //                 <strong>Esperado:</strong> {feedback.expectedOutput} <br />
        //                 <strong>Salida:</strong> {feedback.output || <em>(vacío)</em>} <br />
        //                 {feedback.error && (
        //                   <span className="text-red-600"><strong>Error:</strong> {feedback.error}</span>
        //                 )}
        //               </li>
        //             ))}
        //           </ul>
        //         </details>
        //       )}

        //       <div className="mt-4">
        //         <label className="block text-sm font-medium mb-1">Calificación</label>
        //         <input
        //           type="number"
        //           defaultValue={submission.score ?? ""}
        //           className="w-20 px-2 py-1 border rounded"
        //           min={0}
        //           max={10}
        //           step={0.5}
        //         />
        //       </div>
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
    </div>
  );
}
