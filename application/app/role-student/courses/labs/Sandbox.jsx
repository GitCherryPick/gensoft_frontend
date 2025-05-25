import { useState, useImperativeHandle, forwardRef } from "react";
import CodeEditor from "@/components/core/CodeEditor"
import PopOverError from "./PopOverError";
import { SANDBOX_API_BASE_URL } from "@/lib/sandbox/sandbox-api-config";

const Sandbox = forwardRef(({
  codigo,
  setCodigo,
  entrada,
  setEntrada,
  salida,
  setSalida,
  children
}, ref) => {
  const [linesIssues, setLinesIssues] = useState({
    line: 0,
    color: ""
  });
  const [archivoGuardado, setArchivoGuardado] = useState("");

  const executeCode = async () => {
    setLinesIssues({
      line: 0,
      color:''
    });
    await fetch(`${SANDBOX_API_BASE_URL}/sandbox/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: codigo,
        call: entrada,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSalida(data.output || data.error);
        const errorColors = {
          'SyntaxError': 'bg-green-500',
          'RuntimeError': 'bg-red-500', 
          'TypeError': 'bg-cyan-500',
          'ValueError': 'bg-purple-500',
          'IndexError': 'bg-orange-500',
          'AttributeError': 'bg-rose-500',
          'KeyError': 'bg-lime-500',
          'ZeroDivisionError': 'bg-indigo-500',
          'ImportError': 'bg-teal-500',
          'UnusedVariable': 'bg-fuchsia-500',
          'NameError': 'bg-yellow-500',
        };
        
        if (data.error) {
          const errorType = data.error.split(':')[0];
          setLinesIssues({
            line: data.line,
            color: errorColors[errorType] || ''
          });
        }
      })
      .catch((error) => {
        setSalida("Error al ejecutar el código: " + error.message);
      });
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

  useImperativeHandle(ref, ()=>({
    saveFile,
    executeCode
  }))

  return (
    <div className="h-[600px] md:col-span-2 md:grid md:grid-cols-[6fr_3fr] md:gap-0">
      <div className="h-full bg-gray-900 rounded-l-lg overflow-hidden">
        <CodeEditor
          codeInput={codigo}
          setCodeInput={setCodigo}
          linesIssues={linesIssues}
        >
          <PopOverError />
        </CodeEditor>
      </div>

      <div className="h-full grid grid-rows-[1fr_auto] bg-black text-white rounded-r-lg overflow-hidden">
        <div className="p-4 overflow-auto text-sm border-b border-gray-700">
          <strong>Salida:</strong>
          <pre>{salida}</pre>
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