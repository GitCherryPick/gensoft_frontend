"use client";
import { useEffect } from "react";
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';

export default function CodeSubmitted({referenceCode}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [referenceCode]);

  return (
    <div className="bg-zinc-900 border border-gray-300 rounded-lg p-4 font-mono text-sm leading-relaxed min-h-[80px] max-w-[700px] min-w-[400px] overflow-auto">
      <div className="relative">
        <div className="pl-5 code-editor ">
          <pre className="language-python" tabIndex={0}>
            <code className="select-none language-python">{referenceCode}</code>
          </pre>
        </div>
        <div className="absolute top-0 left-0 pl-1 pr-1 text-right text-indigo-400 select-none">
          {referenceCode.split("\n").map((_, i) => (
            <div key={i} className="h-[1.5em] px-2">{i + 1}</div>
          ))}
        </div>
      </div>
    </div>)
}