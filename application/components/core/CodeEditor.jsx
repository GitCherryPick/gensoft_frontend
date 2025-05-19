"use client";
import { useRef, useEffect, useMemo } from "react";

const PYTHON_SYNTAX = {
  keywords: {
    pattern: /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g,
    color: 'text-[#FF79C6]'
  },
  builtins: {
    pattern: /\b(abs|all|any|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip)\b/g,
    color: 'text-[#8BE9FD]'
  },
  strings: {
    pattern: /("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g,
    color: 'text-[#F1FA8C]'
  },
  numbers: {
    pattern: /\b(\d+(\.\d+)?)\b/g,
    color: 'text-[#BD93F9]'
  },
  comments: {
    pattern: /#.*/g,
    color: 'text-[#6272A4]'
  },
  decorators: {
    pattern: /@[\w\d_.]+/g,
    color: 'text-[#50FA7B]'
  },
  operators: {
    pattern: /[+\-*/%=<>!&|^~]+/g,
    color: 'text-[#FF79C6]'
  }
};

export default function CodeEditor({
  codeInput,
  setCodeInput,
  children,
}) {
  const textareaRef = useRef(null);
  const linesRef = useRef(null);
  const highlightRef = useRef(null);

  const highlightCode = (code) => {
    let highlighted = code;
    let spans = [];
    let lastIndex = 0;

    const processMatch = (match, color, index) => {
      if (index > lastIndex) {
        spans.push(<span key={spans.length} className="text-white">{highlighted.slice(lastIndex, index)}</span>);
      }
      spans.push(<span key={spans.length} className={color}>{match}</span>);
      lastIndex = index + match.length;
    };

    Object.entries(PYTHON_SYNTAX).forEach(([type, { pattern, color }]) => {
      pattern.lastIndex = 0; // Reset el índice de regex
      let match;
      while ((match = pattern.exec(code)) !== null) {
        processMatch(match[0], color, match.index);
      }
    });

    if (lastIndex < code.length) {
      spans.push(<span key={spans.length} className="text-white">{highlighted.slice(lastIndex)}</span>);
    }

    return spans;
  };

  const highlightedCode = useMemo(() => highlightCode(codeInput), [codeInput]);

  useEffect(() => {
    const syncScroll = () => {
      if (!textareaRef.current || !highlightRef.current) return;
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      
      if (linesRef.current) {
        linesRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    };

    
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('scroll', syncScroll);
      textarea.addEventListener('input', syncScroll);
      
      return () => {
        textarea.removeEventListener('scroll', syncScroll);
        textarea.removeEventListener('input', syncScroll);
      };
    }
  }, []);

  const lines = codeInput.split("\n").length;
  const handleIndentation = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue =
        codeInput.substring(0, start) + '    ' + codeInput.substring(end);
      setCodeInput(newValue);

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
            <div key={i} className="">{i + 1}</div>
          ))}
        </div>

        <div className="flex-1 relative code-editor-main">
          <div 
            ref={highlightRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-auto px-4 py-2 whitespace-pre"
            aria-hidden="true"
          >
            {highlightedCode}
          </div>
          <textarea
            ref={textareaRef}
            className="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-white px-4 py-2 resize-none focus:outline-none whitespace-pre overflow-auto selection:bg-indigo-500/30"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={handleIndentation}
            placeholder="Escribe aquí tu código..."
            spellCheck={false}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
