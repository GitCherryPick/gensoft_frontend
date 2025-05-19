"use client";
import { useState, useRef, useEffect } from "react";

export default function CodeEditor({
  codeInput,
  setCodeInput,
  children,
}) {
  const textareaRef = useRef(null);
  const linesRef = useRef(null);

  const handleScroll = () => {
    if (linesRef.current && textareaRef.current) {
      linesRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lines = codeInput.split("\n").length;

  const handleIndentation = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue =
        studentCode.substring(0, start) + '    ' + studentCode.substring(end);
      setStudentCode(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      });
    }
  }

  return (
    <div className="relative bg-zinc-800 border border-gray-300 rounded-lg p-4 font-mono text-sm leading-relaxed">
      <div className="flex h-64 overflow-hidden rounded-lg">
        <div
          ref={linesRef}
          className="flex flex-col items-end text-indigo-400 p-2 select-none overflow-hidden border-r border-gray-600"
        >
          {Array.from({ length: lines || 1 }, (_, i) => (
            <div key={i} className="h-[1.5em]">{i + 1}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className="flex-1 bg-zinc-800 text-white px-4 py-2 resize-none focus:outline-none whitespace-pre leading-[1.5em] overflow-auto"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          onKeyDown={handleIndentation}
          placeholder="Escribe aquí tu código..."
          spellCheck={false}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onScroll={handleScroll}
        />
      </div>
      {children}
    </div>
  );
}
