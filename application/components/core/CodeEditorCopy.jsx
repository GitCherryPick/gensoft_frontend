"use client";
import { useRef, useEffect, useMemo } from "react";

const PYTHON_SYNTAX = {
  keywords: {
    pattern: /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g,
    color: 'text-[#FF79C6]',
    priority: 2
  },
  builtins: {
    pattern: /\b(abs|all|any|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip)\b/g,
    color: 'text-[#8BE9FD]',
    priority: 3
  },
  strings: {
    // Coincide con strings de comillas simples, dobles, triples simples y triples dobles, incluyendo espacios y saltos de línea
    pattern: /("""[\s\S]*?"""|'''[\s\S]*?'''|"([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g,
    color: 'text-[#F1FA8C]',
    priority: 1
  },
  numbers: {
    // Coincide con enteros, decimales, hexadecimales, binarios, octales, notación científica y complejos
    pattern: /\b(-?(0[xX][\da-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?j?)\b/g,
    color: 'text-[#BD93F9]',
    priority: 7
  },
  comments: {
    pattern: /#.*/g,
    color: 'text-[#6272A4]',
    priority: 8
  },
  decorators: {
    pattern: /@[\w\d_.]+/g,
    color: 'text-[#50FA7B]',
    priority: 9
  },
  operators: {
    pattern: /[+\-*/%=<>!&|^~]+/g,
    color: 'text-[#FF79C6]',
    priority: 5
  }
};

export default function CodeEditorCopy({
  codeInput,
  setCodeInput,
  children,
}) {
  const textareaRef = useRef(null);
  const linesRef = useRef(null);
  const highlightRef = useRef(null);

  const highlightCode = (code) => {
    // 1. Recoger matches para cada tipo, con prioridad (strings primero)
    let allMatches = [];
    Object.entries(PYTHON_SYNTAX).forEach(([type, { pattern, color }], priority) => {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(code)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          color,
          text: match[0],
          priority,
        });
      }
    });
    // 2. Ordenar matches por prioridad (menor primero = mayor prioridad) y posición
    allMatches.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.start - b.start;
    });
    // 3. Filtrar matches para evitar solapamientos (no resaltar números dentro de strings)
    let filtered = [];
    let occupied = Array(code.length).fill(false);
    for (let m of allMatches) {
      let overlap = false;
      for (let i = m.start; i < m.end; i++) {
        if (occupied[i]) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        filtered.push(m);
        for (let i = m.start; i < m.end; i++) occupied[i] = true;
      }
    }
    // 4. Generar el resultado final, asegurando que cada fragmento solo se agregue una vez
    let result = [];
    let cursor = 0;
    filtered.sort((a, b) => a.start - b.start);
    for (let i = 0; i < filtered.length; i++) {
      const { start, end, color, text } = filtered[i];
      // Añadir texto plano entre el cursor y el inicio del match
      if (start > cursor) {
        result.push(
          <span key={result.length} className="text-white">
            {code.slice(cursor, start)}
          </span>
        );
      }
      // Añadir el match resaltado
      result.push(
        <span key={result.length} className={color}>
          {text}
        </span>
      );
      cursor = end;
    }
    // Añadir texto plano restante
    if (cursor < code.length) {
      result.push(
        <span key={result.length} className="text-white">
          {code.slice(cursor)}
        </span>
      );
    }
    return result;
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
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue =
        codeInput.substring(0, start) + '    ' + codeInput.substring(end);
      setCodeInput(newValue);

      // Ajustar el cursor solo para tabulación
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleChange = (e) => {
    setCodeInput(e.target.value);
  }

  return (
    <div className="relative flex flex-col h-full w-full bg-zinc-800 font-mono text-base leading-snug rounded-xl overflow-hidden border border-gray-700">
      <div className="flex flex-1 overflow-hidden">
        <div
          ref={linesRef}
          className="flex flex-col items-end text-indigo-400/80 px-3 py-3 select-none overflow-hidden border-r border-gray-700 bg-zinc-900/30"
        >
          {Array.from({ length: lines || 1 }, (_, i) => (
            <div
              className="min-h-[1.5em] leading-6 text-xs text-right w-6 text-gray-400"
              key={i}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 relative code-editor-main bg-zinc-900/50">
          <div 
            ref={highlightRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-auto px-4 py-3 whitespace-pre text-gray-200 text-sm"
            style={{ 
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              lineHeight: '1.5rem',
              whiteSpace: 'pre',
              wordBreak: 'break-all',
              letterSpacing: 'normal',
              tabSize: 2
            }}
            aria-hidden="true"
          >
            {highlightedCode}
          </div>
          <textarea
            ref={textareaRef}
            className="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-white px-4 py-3 resize-none outline-none font-mono text-sm leading-6 whitespace-pre overflow-auto"
            style={{ 
              lineHeight: '1.5rem',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              letterSpacing: 'normal',
              tabSize: 2
            }}
            value={codeInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Escribe aquí tu código..."
            spellCheck={false}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
