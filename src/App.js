import React, { useState } from 'react';
import './style.css';
import LineInstructions from './LineInstructionsForm';

export default function App() {
  const [lineInstructions, setLineInstructions] = useState([
    {
      startLine: 1,
      endLine: 1,
      fields: [
        { name: 'Company Name', startPos: 1, endPos: 27 },
        { name: 'Fiscal Year', startPos: 28, endPos: 31 },
      ],
    },
    {
      startLine: 2,
      endLine: 3,
      fields: [
        { name: 'Campo 1 ao 8', startPos: 1, endPos: 8 },
        { name: 'Another Field', startPos: 9, endPos: 28 },
      ],
    },
  ]);

  return (
    <div>
      <LineInstructions
        lineInstructions={lineInstructions}
        setLineInstructions={setLineInstructions}
      />
    </div>
  );
}
