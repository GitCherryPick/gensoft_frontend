import { notFound } from "next/navigation";

import  StudentExamView from "./StudentExamView"; 
import { ScrollArea } from "@/components/ui/scroll-area";


async function fetchExamData(examId) {
  try {
    //ejemplo de examen
    const examData = {
      id: examId,
      title: "Examen de funcion de suma",
      description: "Has la funcion de la suma",
      timeLimit: 60,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          title: "What is the output of this code?",
          description: "Consider the following code snippet: `print(2 + 2)`",
          options: ["2", "4", "22", "Error"],
          points: 10,
        },
        {
          id: "q2",
          type: "CodeWithTest",
          title: "Write a function to add two numbers",
          description: "Create a function that takes two numbers and returns their sum.",
          codeTemplate: "function add(a, b) {\n  // Your code here\n}",
          testCases: [
            {
              id: "t1",
              input: "2, 3",
              expectedOutput: "5",
              isVisible: true,
            },
            {
              id: "t2",
              input: "0, 0",
              expectedOutput: "0",
              isVisible: true,
            },
          ],
          points: 20,
        },
        {
          id: "q3",
          type: "Replication",
          title: "Replicate the given code",
          description: "Replicate the visible lines of the following code.",
          codigoObjetivo: "function greet() {\n  console.log('Hello');\n  return 'Hello World';\n}",
          lineasVisibles: [1, 3],
          codeTemplate: "// Replicate the visible lines\n",
          points: 15,
        },
      ],
      settings: {
        randomizeQuestions: false,
        showResults: true,
        allowRetake: false,
        passingScore: 70,
      },
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return examData;
  } catch (error) {
    console.error("Error fetching exam data:", error);
    return null;
  }
}

export default async function ExamPage({ params }) {
  const { examId } = params;

  
  const exam = await fetchExamData(examId);


  if (!exam) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-dark-1 relative flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold text-white">{exam.title || "Examen"}</h1>
              {exam.description && (
                <p className="text-gray-400">{exam.description}</p>
              )}
              <p className="text-gray-400 text-sm">
                Tiempo límite: {exam.timeLimit} minutos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <StudentExamView exam={exam} />
        </div>
      </ScrollArea>
    </div>
  );
}