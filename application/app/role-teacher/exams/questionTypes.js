import { CheckCircle, CheckSquare, FileCode, Code } from "lucide-react";

export const questionTypes = [
  {
    type: "multiple-choice",
    label: "Selección Unica",
    icon: <CheckCircle size={20} />,
    gradient: "from-rose-300 to-pink-600",
    description: "Una sola respuesta correcta",
  },
  {
    type: "multiple-select",
    label: "Selección Múltiple",
    icon: <CheckSquare size={20} />,
    gradient: "from-violet-300 to-purple-600",
    description: "Múltiples respuestas correctas",
  },
  {
    type: "Replication",
    label: "Replicación de codigo",
    icon: <FileCode size={20} />,
    gradient: "from-emerald-300 to-teal-600",
    description: "Replica el código de ejemplo",
  },
  {
    type: "CodeWithTest",
    label: "Implementacion de codigo",
    icon: <Code size={20} />,
    gradient: "from-sky-300 to-blue-600",
    description: "Implementa el codigo y pasa los tests",
  },
];
