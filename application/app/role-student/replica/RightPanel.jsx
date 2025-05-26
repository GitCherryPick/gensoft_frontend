"use client";

import { useEffect, useState, useRef } from 'react';
import PromiseButton from "@/components/core/PromiseButton";
import { Code2, Bot } from 'lucide-react';
import StudentMessage from './StudentMessage';
import AssistantMessage from './AssistantMessage';

export default function RightPanel({ code, onHelpRequest, initialAssistantData = null }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: [
        'Hola, soy tu asistente de programación. Estoy aquí para ayudarte con tus ejercicios de programación.',
        'Puedes enviar tu código cuando estés listo. Recibirás sugerencias hasta que llegues a la solución correcta.'
      ],
      evaluation: {},
      timestamp: new Date()
    }
  ]);
  
  const [showContent, setShowContent] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const createEvaluationMessage = (result) => {
    return {
      id: Date.now(),
      type: 'assistant',
      content: '',
      evaluation: result,
      timestamp: new Date()
    };
  };

  const handleButtonClick = async () => {
    if (!onHelpRequest || !code) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: 'He enviado mi código para revisión',
      code: code,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const result = await onHelpRequest();
      
      const evaluationMessage = createEvaluationMessage(result);
      
      console.log('Adding assistant message:', evaluationMessage);
      setMessages(prev => [...prev, evaluationMessage]);
    } catch (error) {
      console.error('Error requesting help:', error);
      
      const errorMessage = {
        id: Date.now() + 2,
        type: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  if (!showContent) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4" 
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        id="chat-messages"
      >
        <style jsx global>{`
          #chat-messages::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {messages.map((message) => {
          if (message.type === 'user') {
            return (
              <StudentMessage
                key={message.id}
                content={message.content}
                code={message.code}
              />
            );
          } else {
            return (
              <AssistantMessage
                key={message.id}
                content={message.content}
                evaluation={message.evaluation || {}}
              />
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <PromiseButton
          onClick={handleButtonClick}
          disabled={!code}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Code2 className="w-5 h-5" />
          <span className="ml-2">Comprobar solución</span>
        </PromiseButton>
      </div>
    </div>
  );
}
