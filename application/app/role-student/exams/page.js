import { notFound } from "next/navigation";

import  StudentExamView from "./StudentExamView"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLastExam } from "@/lib/sandbox/sandbox-service";


async function fetchExamData(examId) {
  try {
    const examData = await getLastExam();
    return examData;
  } catch (error) {
    console.error("Error fetching exam data:", error);
    return null;
  }
}

export default async function ExamPage({ params }) {
  const { examId } = params;

  
  const exam = await fetchExamData(examId);
  console.log("Exam data:", exam);


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