"use client";
import { Play } from "lucide-react";
import { useState } from "react";

export default function CodeTask() {
  const [studentCode, setStudentCode] = useState("");

  const referenceCode = `from data.functions import *
posts = get_posts_in_range("2020-01-01", "2020-01-31")
popular_posts = 0
for post in posts:
    if post.likes > 100:
        popular_posts += 1
print(popular_posts)`;

  const handleRun = () => {
    console.log("Student code:", studentCode);
  };

  const handleIndentation = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue =
        studentCode.substring(0, start) + '    ' + studentCode.substring(end); // usa dos espacios como tabulación
      setStudentCode(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  }
  

  return (
    <div className="flex flex-col gap-6 w-full h-500px p-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-extrabold text-2xl text-center leading-tight mb-2 text-gray-50">Conditional Statements</h1>
        <p className="text-base text-gray-100 leading-relaxed mb-4">
          So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you at that moment, I was a marine biologist.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <div className="md:basis-1/2 h-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Código de referencia (no editable):
          </label>
          <div className="bg-zinc-900 border border-gray-300 rounded-lg p-4 font-mono text-sm leading-relaxed overflow-x-auto">
            {referenceCode.split("\n").map((line, index) => (
              <div key={index} className="grid grid-cols-[30px_1fr] gap-x-2">
                <div className="text-indigo-400 select-none text-right pr-2">{index + 1}</div>
                <div className="text-white select-none whitespace-pre">{line}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:basis-1/2 h-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tu solución:
          </label>
          <div className="relative bg-zinc-800 border border-gray-300 rounded-lg p-4 font-mono text-sm leading-relaxed">
            <div className="flex h-64 overflow-auto rounded-lg">
              <div className="flex flex-col items-end text-indigo-400 px-2 py-2 select-none border-r border-gray-600 flex-shrink-0">
              {Array.from({ length: studentCode.split("\n").length || 1}, (_,i) => (
                <div key={i} className="text-indigo-400 h-[1.5em]">{i + 1}</div>
              ))}
              </div>
              <textarea
                className="flex-1 bg-zinc-800 text-white px-4 py-2 resize-none focus:outline-none whitespace-pre leading-[1.5em]"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                onKeyDown={(e) => handleIndentation(e)}
                placeholder="Escribe aquí tu código..."
                spellCheck={false}
                style={{ tabSize:2, textIndent: 0}}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <button
              type="button"
              onClick={handleRun}
              className="mt-4 bg-gray-900 text-white text-sm font-semibold rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition justify-self-end"
            >
              <Play className="h-3" />
              Comparar
            </button>
          </div>
        </div>

      </div>
    </div>

  );
}
