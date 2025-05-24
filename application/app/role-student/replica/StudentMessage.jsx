"use client";

import { User } from 'lucide-react';

export default function StudentMessage({ content, code }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-start gap-3 max-w-[90%]">
        <div className="flex flex-col items-end gap-2 w-full">
          {content && (
            <div className="bg-transparent border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl text-[15px] leading-snug">
              {content}
            </div>
          )}
          {code && (
            <div className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] rounded-tl-xl rounded-bl-xl rounded-br-xl overflow-hidden border border-gray-200 dark:border-gray-600">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                Tu código
              </div>
              <pre className="p-4 font-mono text-sm text-gray-800 dark:text-gray-200 bg-transparent overflow-x-auto">
                {code}
              </pre>
            </div>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 flex-shrink-0">
          <User size={14} />
        </div>
      </div>
    </div>
  );
}
