// TestCaseResult.jsx
import React, { useState } from 'react';

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
          <p><strong>Entrada:</strong> <pre>{input}</pre></p>
          <p><strong>Salida esperada:</strong> <pre>{expectedOutput}</pre></p>
          <p><strong>Tu Salida:</strong> <pre>{output}</pre></p>
        </div>
        <div className='m-2 p-2 bg-indigo-900 border border-indigo-300 rounded-lg text-white'>
          <p className='text-sm/6'>{feedback}</p>
        </div>
        </>
      )}
    </div>
  );
};

export default TestCaseResult;
