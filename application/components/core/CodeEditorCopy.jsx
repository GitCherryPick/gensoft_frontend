"use client";
import { useRef, useEffect, useMemo, useState, forwardRef, useImperativeHandle } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

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
    pattern: /("""[\s\S]*?"""|'''[\s\S]*?'''|"([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g,
    color: 'text-[#F1FA8C]',
    priority: 1
  },
  numbers: {
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
    color: 'text-yellow-500',
    priority: 5
  }
};

// Para leer las líneas visibles y fijadas, usar los métodos getVisibleLines() y getPinnedLines() a través del ref.
// Ejemplo: editorRef.current.getVisibleLines() y editorRef.current.getPinnedLines()

const CodeEditorCopy = forwardRef(({
  codeInput,
  setCodeInput,
  children,
  showLineVisibilityToggle = false,
  showPin = false,
  blockedLines = [],
}, ref) => {
  const textareaRef = useRef(null);
  const linesRef = useRef(null);
  const highlightRef = useRef(null);
  const [lines, setLines] = useState(1);
  const [highlightedCode, setHighlightedCode] = useState('');
  const [visibleLines, setVisibleLines] = useState(new Set());
  const [pinnedLines, setPinnedLines] = useState(new Set());
  const blockedLinesSet = useMemo(() => new Set(blockedLines), [blockedLines]);

  const toggleLineVisibility = (lineNumber) => {
    setVisibleLines(prev => {
      const newVisible = new Set(prev);
      if (newVisible.has(lineNumber)) {
        newVisible.delete(lineNumber);
      } else {
        newVisible.add(lineNumber);
      }
      return newVisible;
    });
  };

  const toggleLinePin = (lineNumber) => {
    setPinnedLines(prev => {
      const newPinned = new Set(prev);
      if (newPinned.has(lineNumber)) {
        newPinned.delete(lineNumber);
      } else {
        newPinned.add(lineNumber);
      }
      return newPinned;
    });
  };

  const getVisibleLines = () => {
    return Array.from(visibleLines).sort((a, b) => a - b);
  };

  const getPinnedLines = () => {
    return Array.from(pinnedLines).sort((a, b) => a - b);
  };

  useImperativeHandle(ref, () => ({
    getVisibleLines,
    getPinnedLines
  }));

  const highlightCode = (code) => {
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
    allMatches.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.start - b.start;
    });
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
    let result = [];
    let cursor = 0;
    filtered.sort((a, b) => a.start - b.start);
    for (let i = 0; i < filtered.length; i++) {
      const { start, end, color, text } = filtered[i];
      if (start > cursor) {
        result.push(
          <span key={result.length} className="text-white">
            {code.slice(cursor, start)}
          </span>
        );
      }
      result.push(
        <span key={result.length} className={color}>
          {text}
        </span>
      );
      cursor = end;
    }
    if (cursor < code.length) {
      result.push(
        <span key={result.length} className="text-white">
          {code.slice(cursor)}
        </span>
      );
    }
    return result;
  };

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

  useEffect(() => {
    setHighlightedCode(highlightCode(codeInput));
  }, [codeInput]);

  useEffect(() => {
    const newLines = codeInput.split("\n");
    setLines(newLines.length);
    
    if (visibleLines.size > 0) {
      const maxLine = newLines.length;
      let hasChanges = false;
      const newVisibleLines = new Set(visibleLines);
      
      visibleLines.forEach(line => {
        if (line > maxLine) {
          newVisibleLines.delete(line);
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        setVisibleLines(newVisibleLines);
      }
    }

    if (pinnedLines.size > 0) {
      const maxLine = newLines.length;
      let hasChanges = false;
      const newPinnedLines = new Set(pinnedLines);
      
      pinnedLines.forEach(line => {
        if (line > maxLine) {
          newPinnedLines.delete(line);
          hasChanges = true;
        }
      });
      if (hasChanges) {
        setPinnedLines(newPinnedLines);
      }
    }
  }, [codeInput, visibleLines, pinnedLines]);

  const getLineNumberAtPosition = (text, position) => {
    const textUpToPosition = text.substring(0, position);
    return (textUpToPosition.match(/\n/g) || []).length + 1;
  };

  const isLineBlocked = (lineNumber) => {
    return blockedLinesSet.has(lineNumber);
  };

  const handleKeyDown = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const currentLineStart = getLineNumberAtPosition(codeInput, start);
    const currentLineEnd = getLineNumberAtPosition(codeInput, end);
    
    let hasBlockedLine = false;
    for (let i = currentLineStart; i <= currentLineEnd; i++) {
      if (isLineBlocked(i)) {
        hasBlockedLine = true;
        break;
      }
    }
    
    if (hasBlockedLine && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
      if (!(e.ctrlKey && e.key === 'c')) {
        e.preventDefault();
        return;
      }
    }
    
    if (e.key === 'Tab') {
      e.preventDefault();
      
      if (hasBlockedLine) return;
      
      const newValue =
        codeInput.substring(0, start) + '    ' + codeInput.substring(end);
      setCodeInput(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (codeInput && newValue) {
      const oldLines = codeInput.split('\n');
      const newLines = newValue.split('\n');
      
      if (oldLines.length !== newLines.length || blockedLinesSet.size > 0) {
        let hasChangesInBlockedLines = false;
        
        const commonLength = Math.min(oldLines.length, newLines.length);
        
        for (let i = 0; i < commonLength; i++) {
          const lineNumber = i + 1;
          if (isLineBlocked(lineNumber) && oldLines[i] !== newLines[i]) {
            hasChangesInBlockedLines = true;
            break;
          }
        }
        
        if (!hasChangesInBlockedLines && oldLines.length !== newLines.length) {
          const diffStartIndex = oldLines.findIndex((line, index) => index < newLines.length ? line !== newLines[index] : true);
          
          if (diffStartIndex !== -1) {
            const affectedLineNumber = diffStartIndex + 1;
            for (const blockedLine of blockedLinesSet) {
              if (blockedLine >= affectedLineNumber) {
                hasChangesInBlockedLines = true;
                break;
              }
            }
          }
        }
        
        if (hasChangesInBlockedLines) {
          e.preventDefault();
          return;
        }
      }
    }
    
    setCodeInput(newValue);
  };

  return (
    <div className="relative flex flex-col h-full max-h-full w-full max-w-full bg-zinc-800 font-mono text-base rounded-xl overflow-hidden border border-gray-700" style={{ lineHeight: '1.6rem', maxHeight: 'calc(100vh - 180px)' }}>
      <div className="flex flex-1 h-full max-h-full overflow-hidden">
        <div
          ref={linesRef}
          className={`flex flex-col items-start text-indigo-400/80 py-3 select-none overflow-hidden border-r border-gray-700 bg-zinc-900/30 h-full max-h-full ${
            (showLineVisibilityToggle && showPin) ? 'min-w-[7rem]' : 
            (showLineVisibilityToggle || showPin) ? 'min-w-[4.5rem]' : 'min-w-[3rem]'
          }`}
          style={{
            lineHeight: '1.6rem',
            height: '100%',
            paddingLeft: (showLineVisibilityToggle || showPin) ? '0.75rem' : '0.75rem',
            paddingRight: '0.5rem',
            transition: 'min-width 0.2s ease, padding 0.2s ease'
          }}
        >
          <div className="flex flex-col" style={{ minHeight: '100%' }}>
            {Array.from({ length: lines || 1 }, (_, i) => {
              const lineNumber = i + 1;
              const isVisible = visibleLines.has(lineNumber);
              const isPinned = pinnedLines.has(lineNumber);
              return (
                <div 
                  key={i} 
                  className={`flex items-center w-full ${isLineBlocked(lineNumber) ? 'bg-yellow-500/10' : ''}`}
                  style={{
                    height: '1.6rem',
                    minHeight: '1.6rem',
                    maxHeight: '1.6rem',
                    lineHeight: '1.6rem',
                    boxSizing: 'content-box'
                  }}
                >
                  {showLineVisibilityToggle && (
                    <button
                      onClick={() => toggleLineVisibility(lineNumber)}
                      className={`w-6 h-7 flex items-center justify-center transition-colors ${isVisible ? 'text-[#B0A1FF]' : 'text-gray-400 hover:text-gray-200'} mr-1`}
                      title={isVisible ? 'Ocultar esta línea al usuario' : 'Mostrar esta línea al usuario'}
                    >
                      {isVisible ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5 opacity-50" />
                      )}
                    </button>
                  )}
                  {showPin && (
                    <button
                      onClick={() => toggleLinePin(lineNumber)}
                      className={`w-6 h-7 flex items-center justify-center transition-colors ${pinnedLines.has(lineNumber) ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-200'} mr-1`}
                      title={pinnedLines.has(lineNumber) ? 'Desbloquear edición de esta línea' : 'Bloquear edición de esta línea'}
                    >
                      <Lock className={`w-5 h-5 ${pinnedLines.has(lineNumber) ? '' : 'opacity-50'}`} />
                    </button>
                  )}
                  <span 
                    className={`text-xs ${isLineBlocked(lineNumber) ? 'text-yellow-400' : ''}`}
                    style={{
                      lineHeight: '1.6rem',
                      height: '1.6rem',
                      display: 'inline-block',
                      width: (showLineVisibilityToggle || showPin) ? '1.5rem' : '1.5rem',
                      textAlign: 'right',
                      paddingRight: (showLineVisibilityToggle || showPin) ? '0' : '0.25rem',
                      transition: 'all 0.2s ease',
                      marginLeft: (showLineVisibilityToggle || showPin) ? '0' : '0.25rem'
                    }}
                  >
                    {lineNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 h-full max-h-full relative code-editor-main bg-zinc-900/50 overflow-y-auto overflow-x-hidden" style={{maxHeight: 'calc(100vh - 180px)'}} >
          <div 
            ref={highlightRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-y-auto px-4 pt-3 pb-0 whitespace-pre text-gray-200 text-sm"
            style={{ 
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              lineHeight: '1.6rem',
              whiteSpace: 'pre',
              wordBreak: 'break-all',
              letterSpacing: 'normal',
              tabSize: 2,
              position: 'relative',
              maxHeight: '100%',
              height: '100%',
              overflowY: 'auto'
            }}
            aria-hidden="true"
          >
            {highlightedCode}
            {Array.from({ length: lines || 1 }, (_, i) => {
              const lineNumber = i + 1;
              if (visibleLines.has(lineNumber) || pinnedLines.has(lineNumber)) {
                return (
                  <div 
                    key={`highlight-${i}`}
                    className={`absolute left-0 right-0 ${visibleLines.has(lineNumber) ? 'bg-[#B0A1FF]/10' : ''} ${pinnedLines.has(lineNumber) ? 'bg-yellow-400/10' : ''} pointer-events-none`}
                    style={{ 
                      top: `calc(0.75rem + ${i} * 1.6rem)`,
                      height: '1.6rem',
                      left: '1rem',
                      right: '1rem',
                      width: 'calc(100% - 2rem)'
                    }}
                  />
                );
              }
              return null;
            })}
          </div>
          <textarea
            ref={textareaRef}
            className="absolute top-0 left-0 w-full h-full max-h-full bg-transparent text-transparent caret-white px-4 pt-3 pb-0 resize-none outline-none font-mono text-sm whitespace-pre overflow-y-auto"
            style={{ 
              lineHeight: '1.6rem',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              maxHeight: '100%',
              height: '100%',
              overflowY: 'auto',
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
});

export default CodeEditorCopy;
