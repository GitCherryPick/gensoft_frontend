import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import CodeEditor from "@/components/core/CodeEditor"
import PopOverError from "./PopOverError";
import { SANDBOX_API_BASE_URL } from "@/lib/sandbox/sandbox-api-config";
import { getWarningsFromAI, executeCode } from "@/lib/sandbox/sandbox-service";

const Sandbox = forwardRef(({
  codigo,
  setCodigo,
  entrada,
  setEntrada,
  salida,
  setSalida,
  feedbackForDocente,
  setFeedbackForDocente,
  taskEnunciado,
  errorsInSubmit,
  children
}, ref) => {
  const [linesIssues, setLinesIssues] = useState({
    line: 0,
    color: ""
  });
  const [archivoGuardado, setArchivoGuardado] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [linesAux, setLinesAux] = useState({
    line: 0,
    error: ""
  });
  const errorColors = {
    'SyntaxError': 'bg-green-500',
    'IndentationError': 'bg-pink-500',
    'RuntimeError': 'bg-red-500',
    'TimeOut': 'bg-red-500',
    'TypeError': 'bg-cyan-500',
    'ValueError': 'bg-purple-500',
    'IndexError': 'bg-orange-500',
    'AttributeError': 'bg-rose-500',
    'KeyError': 'bg-lime-500',
    'ZeroDivisionError': 'bg-indigo-500',
    'ImportError': 'bg-teal-500',
    'UnusedVariable': 'bg-fuchsia-500',
    'NameError': 'bg-yellow-500',
    'UnboundLocalError': 'bg-yellow-500'
  };

  useEffect(() => {
    if (linesAux.line !== 0 && linesIssues.line == 0 || linesIssues.line == "") {
      updateLinesIssues(linesAux);
    }
  }, [linesAux]);

  useEffect(() => {
    if(errorsInSubmit.error === ""){
      return;
    };
    
    updateLinesIssues(errorsInSubmit);
    setWarnings([errorsInSubmit.error])
  }, [errorsInSubmit]);

  const updateLinesIssues = (issueData) => {

    if (!issueData || issueData.line === 0) {
      setLinesIssues({ line: 0, color: "" })
    }
    if (issueData.error) {
      const errorType = issueData.error.split(':')[0];
      setLinesIssues({
        line: issueData.line,
        color: errorColors[errorType] || ''
      });
    }
  }

  const getWarnings = async (execData) => {
    try {
      const codeData = {
        codigo_estudiante: codigo,
        enunciado: taskEnunciado,
        llamada_funcion: entrada,
        resultado_obtenido: execData.output || execData.error,
      }
      const response = await getWarningsFromAI(codeData);
      setWarnings(response.warnings || []);
      setFeedbackForDocente([response.feedback_docente]);
      const primerError = response.errores;
      if (primerError?.line !== 0) {
        setLinesAux({
          line: response.errores?.line || 0,
          error: response.errores?.error || ""
        });
      }
    } catch (error) {
      console.error("Error en getWarnings:", error);
    }
  }

  const executeCode = async () => {
    try {
      setLinesIssues({
        line: 0,
        color: ''
      });
      const data = await executeCode({
          code: codigo,
          call: entrada,
      });
      setSalida(data.output || data.error);
      await getWarnings(data);
      updateLinesIssues(data);
    } catch (error) {
      setSalida("Error al ejecutar el código: " + error.message);
      console.error("Error en executeCode:", error);
    }
  };

  function saveFile() {
    const blob = new Blob([codigo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codigo.py";
    a.click();
    URL.revokeObjectURL(url);
    setArchivoGuardado("Archivo guardado como codigo.py");
  }

  useImperativeHandle(ref, () => ({
    saveFile,
    executeCode
  }))

  return (
    <div className="col-span-2 w-full h-auto flex flex-col md:grid md:grid-cols-[6fr_3fr] md:gap-0">
      <div className="h-auto min-h-[200px] bg-gray-900 rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
        <CodeEditor
          codeInput={codigo}
          setCodeInput={setCodigo}
          linesIssues={linesIssues}
        >
          <PopOverError />
        </CodeEditor>
      </div>

      <div className="h-auto min-h-[200px] grid grid-rows-[1fr_auto] bg-black text-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none overflow-hidden">
        <div className="p-4 overflow-auto text-sm border-b border-gray-700">
          <strong>Salida:</strong>
          <p>{salida}</p>
          {warnings && (
            <div className="mt-2">
              <strong>Warnings:</strong>
              <ul className="list-disc pl-5">
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
          {archivoGuardado && (
            <div className="text-green-400 mt-2">{archivoGuardado}</div>
          )}
        </div>
        <div className="p-4 bg-gray-900 border-t border-gray-700">
          <label htmlFor="entrada" className="block font-bold mb-1">Entrada:</label>
          <textarea
            id="entrada"
            className="w-full h-20 p-2 border border-gray-600 bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 resize-none text-white"
            placeholder="Escribe aquí tus valores de entrada..."
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
          />
        </div>
      </div>
      {children}
    </div>
  )
});

export default Sandbox;