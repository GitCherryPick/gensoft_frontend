"use client";
import { useRef, useEffect, useState, useMemo } from "react";

const PYTHON_SYNTAX = {
  keywords: {
    pattern: /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g,
    color: 'text-[#FF79C6]',
    priority: 3
  },
  builtins: {
    pattern: /\b(abs|all|any|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip)\b/g,
    color: 'text-[#8BE9FD]',
    priority: 4
  },
  strings: {
    pattern: /("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g,
    color: 'text-[#F1FA8C]',
    priority: 2
  },
  numbers: {
    pattern: /\b(\d+(\.\d+)?)\b/g,
    color: 'text-[#BD93F9]',
    priority: 7
  },
  comments: {
    pattern: /#.*/g,
    color: 'text-[#6272A4]',
    priority: 1
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

const CodeEditor =
  ({
    codeInput,
    setCodeInput,
    linesIssues = {
      line: 0,
      color: ""
    },
    blockedLines = [],
    children,
  }) => {
    const textareaRef = useRef(null);
    const linesRef = useRef(null);
    const highlightRef = useRef(null);
    const [highlightedCode, setHighlightedCode] = useState('');
    const blockedLinesSet = useMemo(() =>
      new Set(blockedLines), [blockedLines]);

    const highlightCode = (code) => {
      let matches = [];

      Object.entries(PYTHON_SYNTAX).forEach(([type, { pattern, color, priority }]) => {
        const regex = new RegExp(pattern.source, pattern.flags);
        let match;
        while ((match = regex.exec(code)) !== null) {
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }

          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            color: color,
            text: match[0],
            priority,
          });
        }
      });

      matches.sort((a, b) => {
        if (a.start !== b.start) {
          return a.start - b.start;
        }
        return a.priority - b.priority;
      });

      // Filter overlapping matches based on priority
      matches = matches.filter((match, index) => {
        for (let i = 0; i < index; i++) {
          const prevMatch = matches[i];
          if (match.start < prevMatch.end && match.start >= prevMatch.start) {
            return false;
          }
        }
        return true;
      });

      let result = [];
      let lastEnd = 0;
      for (let i = 0; i < matches.length; i++) {
        const { start, end, color, text } = matches[i];
        if (start > lastEnd) {
          result.push(
            <span key={`text-${lastEnd}-${start}`} className="text-white">
              {code.slice(lastEnd, start)}
            </span>
          );
        }
        result.push(
          <span key={`highlight-${start}-${end}`} className={color}>
            {text}
          </span>
        );
        lastEnd = end;
      }

      if (lastEnd < code.length) {
        result.push(
          <span key={`text-${lastEnd}-${code.length}`} className="text-white">
            {code.slice(lastEnd)}
          </span>
        );
      }

      return result;
    };

    useEffect(() => {
      setHighlightedCode(highlightCode(codeInput));
    }, [codeInput]);

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
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const currentStartLine = getLineNumberAtPosition(codeInput, start);
      const currentEndLine = getLineNumberAtPosition(codeInput, end);

      let hasBlockedLine = false;
      for (let i = currentStartLine; i <= currentEndLine; i++) {
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

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        });
      }
    }

    const getLineNumberAtPosition = (text, position) => {
      const textUpToPosition = text.substring(0, position);
      return (textUpToPosition.match(/\n/g) || []).length + 1;
    };

    const isLineBlocked = (lineNumber) => {
      return blockedLinesSet.has(lineNumber);
    };

    const handleChangeCode = (e) => {
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
      <div className="relative bg-zinc-800 border border-gray-300 rounded-lg p-4 font-mono text-sm leading-relaxed h-full">
        <div className="flex h-full overflow-hidden rounded-lg min-h-0">
          <div
            ref={linesRef}
            className="flex flex-col items-end text-indigo-400 px-2 select-none overflow-hidden border-r border-gray-600"
          >
            {Array.from({ length: lines || 1 }, (_, i) => (
              <div
                key={i}
                className={`${linesIssues.line === i + 1 ? `${linesIssues.color} bg-opacity-5` : ''}h-[24px] flex items-center`}
                style={{
                  height: '1.6rem',
                  minHeight: '1.6rem',
                  maxHeight: '1.6rem',
                  lineHeight: '1.6rem',
                  boxSizing: 'content-box'
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="flex-1 relative code-editor-main">
            {linesIssues.line > 0 && (
              <div
                className={`absolute w-full ${linesIssues.color} bg-opacity-35`}
                style={{
                  top: `${(linesIssues.line - 1) * 1.6}rem`,
                  height: '1.6rem',
                  minHeight: '1.6rem',
                  maxHeight: '1.6rem',
                  lineHeight: '1.6rem',
                }}
              />
            )}
            <div
              ref={highlightRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-auto px-4 whitespace-pre leading-[24px]"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                lineHeight: '1.6rem',
                whiteSpace: 'pre',
                wordBreak: 'break-all',
                letterSpacing: 'normal',
                tabSize: 2,
                position: 'relative'
              }}
              aria-hidden="true"
            >
              {highlightedCode}
            </div>
            <textarea
              ref={textareaRef}
              className="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-white px-4 resize-none focus:outline-none whitespace-pre overflow-auto selection:bg-indigo-500/30 leading-[24px]"
              style={{
                lineHeight: '1.6rem',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                letterSpacing: 'normal',
                tabSize: 2
              }}
              value={codeInput}
              onChange={handleChangeCode}
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

export default CodeEditor;