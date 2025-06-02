// TestCaseResult.jsx
import React, { useState } from 'react';

const TestCaseResult = ({ input, expectedOutput, output, veredict, testNumber }) => {

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
        <div style={{ padding: '10px', paddingTop: 0 }}>
          <p><strong>Input:</strong> <pre>{input}</pre></p>
          <p><strong>Expected Output:</strong> <pre>{expectedOutput}</pre></p>
          <p><strong>Your Output:</strong> <pre>{output}</pre></p>
        </div>
      )}
    </div>
  );
};

export default TestCaseResult;
