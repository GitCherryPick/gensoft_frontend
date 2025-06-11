// TestCaseResult.jsx
import React, { useState } from 'react';
import { Sparkle } from 'lucide-react';

const TestCaseResult = ({ input, expectedOutput, output, veredict, testNumber, feedback }) => {
    if(veredict=="Error"){
        veredict="Fallido"
    }
  const [expandido, setExpandido] = useState(false);
  const isAccepted = veredict === 'Accepted';

  return (
    <div
      style={{
        border: '1px solid #ccc',
        marginBottom: '10px',
        borderRadius: '5px',
        backgroundColor: isAccepted ? '#e6ffe6' : '#ffe6e6',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => setExpandido(!expandido)}
    >
      <div style={{ padding: '10px', fontWeight: 'bold' }}>
        Test {testNumber} : <span style={{ color: isAccepted ? 'green' : 'red' }}>{veredict}</span>
      </div>
      {expandido && (
        <>
        <div style={{ padding: '10px', paddingTop: 0 }}>
          <div><strong>Entrada:</strong> <pre>{input}</pre></div>
          <div><strong>Salida esperada:</strong> <pre>{expectedOutput}</pre></div>
          <div><strong>Tu Salida:</strong> <pre>{output}</pre></div>
        </div>
        <div className='m-2 p-4 bg-indigo-900 border border-indigo-300 rounded-lg text-white'>
          <div className='flex flex-row space-x-2 text-amber-300 items-center'>
            <Sparkle className='text-sm h-4'/>
            <p className='text-semibold text-base'>Comentario sobre tu progreso:</p>
          </div>
          <p className='text-sm/6'>{feedback}</p>
        </div>
        </>
      )}
    </div>
  );
};

export default TestCaseResult;
