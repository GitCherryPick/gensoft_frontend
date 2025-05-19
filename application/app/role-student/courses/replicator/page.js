"use client";
import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/core/Button";
import CodeEditor from "@/components/core/CodeEditor";
import ToReplicate from "./ToReplicate";
import TaskHeader from "./TaskHeader";

export default function CodeTask() {
  const [studentCode, setStudentCode] = useState("");

  const referenceCode = `hardcode: from data.functions import *
posts = get_posts_in_range("2020-01-01", "2020-01-31")
popular_posts = 0
for post in posts:
    if post.likes > 100:
        popular_posts += 1
print(popular_posts)`;
  const title = "Conditional Statements";
  const descrip = "So I started to walk into the water. I won't lie to you boys..."

  const handleRun = () => {
    console.log("Student code:", studentCode);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full p-2 overflow-auto">
      <TaskHeader title={title} description={descrip} />
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <div className="md:basis-1/2 h-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Código de referencia (no editable):
          </label>
          <ToReplicate  referenceCode={referenceCode} />
        </div>
        <div className="md:basis-1/2 h-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tu solución:
          </label>
          <CodeEditor
            codeInput={studentCode}
            setCodeInput={setStudentCode}
          >
            <div className="flex flex-row justify-end">
              <Button
                type="button"
                onClick={handleRun}
                className="mt-2 h-8 bg-gray-900 text-white text-sm font-semibold rounded flex items-center gap-2 hover:bg-indigo-800 transition justify-self-end"
              >
                <Play className="h-3" />
                Comparar
              </Button>
            </div>
          </CodeEditor>
        </div>
      </div>
    </div>

  );
}
