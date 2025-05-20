"use client";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "@/components/core/Button";
import CodeEditor from "@/components/core/CodeEditor";
import ToReplicate from "./ToReplicate";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getTaskReferenceCode, getTaskTemplateCode, compareTaskCode } from "@/lib/tasks-teacher/task-service";

export default function ReplicatorBody({ task_id }) {
  const [studentCode, setStudentCode] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [moodAlert, setMoodAlert] = useState({
    open: false,
    type: "default",
    title: "",
    description: ""
  });

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const [referenceData, templateData] = await Promise.all([
          getTaskReferenceCode(task_id),
          getTaskTemplateCode(task_id)
        ]);
        
        setReferenceCode(referenceData.expected_code);
        setStudentCode(templateData.template_code);
      } catch (error) {
        console.error("Error fetching:", error);
        setMoodAlert({
          open: true,
          type: "destructive",
          title: "Error",
          description: "No se pudo cargar el código de referencia o la plantilla"
        });
      }
    };

    fetchCodes();
  }, [task_id]);

  const handleRun = async () => {
    try {
      const data = await compareTaskCode(task_id, studentCode);
      showAlert(data);
    } catch (error) {
      setMoodAlert({
        open: true,
        type: "destructive",
        title: "Error",
        description: "Hubo un error al enviar tu código"
      });
    }
  };

  const showAlert = (data) => {
    if (data.result === "Incorrecto") {
      let detailed = data.details.map(detail => 
        `En la linea ${detail.line}, se esperaba ${detail.expected} y se obtuvo ${detail.got}`
      );
      
      setMoodAlert({
        open: true,
        type: "destructive",
        title: "Error",
        description: detailed
      });
    } else {
      setMoodAlert({
        open: true,
        type: "default",
        title: "Completado",
        description: data.result
      });
    }
  };

  return (
    <div>
      <div className="flex-1 overflow-auto p-4 flex flex-col md:flex-row gap-6">
        <div className="md:basis-1/2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Código de referencia (no editable):
          </label>
          <ToReplicate referenceCode={referenceCode} />
        </div>

        <div className="md:basis-1/2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tu solución:
          </label>
          <CodeEditor codeInput={studentCode} setCodeInput={setStudentCode}>
            <div className="flex flex-row justify-end">
              <Button
                type="button"
                onClick={handleRun}
                className="mt-2 h-8 bg-gray-900 text-white text-sm font-semibold rounded flex items-center gap-2 hover:bg-indigo-800 transition"
              >
                <Play className="h-3" />
                Comparar
              </Button>
            </div>
          </CodeEditor>
        </div>
      </div>
      {moodAlert.open && (
        <div className="max-w-3xl mx-auto">
        <Alert variant={moodAlert.type} className="z-15">
          <AlertTitle>{moodAlert.title}</AlertTitle>
          <AlertDescription>
            {Array.isArray(moodAlert.description) ? (
              moodAlert.description.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))
            ) : (
              <p>{moodAlert.description}</p>
            )}
          </AlertDescription>
        </Alert>
        </div>
      )}
    </div>
  );
}