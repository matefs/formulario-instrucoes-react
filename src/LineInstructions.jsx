import React, { useState } from 'react';

function Form() {
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
        { name: 'Another Field', startPos: 8, endPos: 28 },
      ],
    },
  ]);

  const handleFieldChange = (lineIndex, fieldIndex, propName, propValue) => {
    const updatedLineInstructions = [...lineInstructions];
    updatedLineInstructions[lineIndex].fields[fieldIndex][propName] = propValue;
    setLineInstructions(updatedLineInstructions);
  };

  const handleSave = () => {
    // Replace this with your save logic
    console.log('Saving line instructions:', lineInstructions);
  };

  return (
    <div>
      {lineInstructions.map((line, lineIndex) => (
        <div key={lineIndex}>
          <p>
            Start Line: {line.startLine} - End Line: {line.endLine}
          </p>
          {line.fields.map((field, fieldIndex) => (
            <div key={fieldIndex}>
              <label htmlFor={`line${lineIndex}field${fieldIndex}Name`}>
                Name
              </label>
              <input
                type="text"
                id={`line${lineIndex}field${fieldIndex}Name`}
                value={field.name}
                onChange={(event) =>
                  handleFieldChange(
                    lineIndex,
                    fieldIndex,
                    'name',
                    event.target.value
                  )
                }
              />

              <label htmlFor={`line${lineIndex}field${fieldIndex}StartPos`}>
                Start Pos
              </label>
              <input
                type="number"
                id={`line${lineIndex}field${fieldIndex}StartPos`}
                value={field.startPos}
                onChange={(event) =>
                  handleFieldChange(
                    lineIndex,
                    fieldIndex,
                    'startPos',
                    parseInt(event.target.value)
                  )
                }
              />

              <label htmlFor={`line${lineIndex}field${fieldIndex}EndPos`}>
                End Pos
              </label>
              <input
                type="number"
                id={`line${lineIndex}field${fieldIndex}EndPos`}
                value={field.endPos}
                onChange={(event) =>
                  handleFieldChange(
                    lineIndex,
                    fieldIndex,
                    'endPos',
                    parseInt(event.target.value)
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSave}>Save</button>

      <div>
        <h1> Adicionar nova linha </h1>
        Começo linha <input />
        Fim linha <input />
        <input type='submit' />
      </div>
    </div>
  );
}

export default Form;
