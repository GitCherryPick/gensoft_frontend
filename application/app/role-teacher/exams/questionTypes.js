import { Circle, CheckCircle, FileText, Code } from "lucide-react";

export const questionTypes = [
  {
    type: "multiple-choice",
    label: "Selección Múltiple",
    icon: <Circle size={20} />,
    gradient: "from-purple-500 to-blue-500",
    description: "Una sola respuesta correcta",
  },
  {
    type: "multiple-select",
    label: "Selección Múltiple",
    icon: <CheckCircle size={20} />,
    gradient: "from-green-500 to-teal-500",
    description: "Múltiples respuestas correctas",
  },
  {
    type: "Replication",
    label: "Replicación de codigo",
    icon: <FileText size={20} />,
    gradient: "from-orange-500 to-red-500",
    description: "Replicar el codigo",
  },
  {
    type: "CodeWithTest",
    label: "Código Python",
    icon: <Code size={20} />,
    gradient: "from-cyan-500 to-indigo-600",
    description: "Ejercicio de programación",
  },
];
