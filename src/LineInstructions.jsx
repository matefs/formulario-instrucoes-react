import React, { useState, useEffect, useRef } from 'react';

const LineInstructions = ({ lineInstructions, setLineInstructions }) => {
  const selectedLineInstructionRef = useRef({ fields: [] });
  const [newField, setNewField] = useState({
    name: '',
    startPos: '',
    endPos: '',
  });

  useEffect(() => {
    const selectedLineInstruction = lineInstructions.find(
      (lineInstruction) => lineInstruction.startLine === 1
    ) || { fields: [] }; // Default value with an empty fields array
    selectedLineInstructionRef.current = selectedLineInstruction;
  }, [lineInstructions]);

  const handleCreateField = () => {
    if (
      newField.name !== '' &&
      newField.startPos !== '' &&
      newField.endPos !== ''
    ) {
      const newLineInstruction = {
        ...selectedLineInstructionRef.current,
        fields: [...selectedLineInstructionRef.current.fields, newField],
      };
      selectedLineInstructionRef.current = newLineInstruction;
      setLineInstructions((prevInstructions) =>
        prevInstructions.map((instruction) =>
          instruction.startLine === newLineInstruction.startLine
            ? newLineInstruction
            : instruction
        )
      );
      setNewField({ name: '', startPos: '', endPos: '' });
    }
  };

  const handleUpdateField = (field) => {
    setNewField({
      ...field,
    });
  };

  const handleDeleteField = (field) => {
    const newLineInstruction = {
      ...selectedLineInstructionRef.current,
      fields: selectedLineInstructionRef.current.fields.filter(
        (f) => f !== field
      ),
    };
    selectedLineInstructionRef.current = newLineInstruction;
    setLineInstructions((prevInstructions) =>
      prevInstructions.map((instruction) =>
        instruction.startLine === newLineInstruction.startLine
          ? newLineInstruction
          : instruction
      )
    );
  };

  const handleSelectLineInstruction = (lineInstruction) => {
    selectedLineInstructionRef.current = lineInstruction;
  };

  return (
    <div>
      <h1>Line Instructions</h1>
      <ul>
        {lineInstructions.map((lineInstruction, index) => (
          <li key={index}>
            <h2>Line {lineInstruction.startLine}</h2>
            <ul>
              {lineInstruction.fields.map((field, fieldIndex) => (
                <li key={fieldIndex}>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      handleUpdateField({ ...field, name: e.target.value })
                    }
                  />
                  {/* Other input fields */}
                  <button onClick={() => handleDeleteField(field)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => handleCreateField()}>
              Create New Field
            </button>
            <button
              onClick={() => handleSelectLineInstruction(lineInstruction)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LineInstructions;
