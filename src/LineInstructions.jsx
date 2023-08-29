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

  const [startLine, setStart] = useState('');
  const [endLine, setEndLine] = useState('');

  const [newFieldName, setNewFieldName] = useState('')

  const handleFieldChange = (lineIndex, fieldIndex, key, value) => {
    const updatedInstructions = [...lineInstructions];
    updatedInstructions[lineIndex].fields[fieldIndex][key] = value;
    setLineInstructions(updatedInstructions);
  };

  const handleAddField = (lineIndex,newFieldName) => {
    const updatedInstructions = [...lineInstructions];
    updatedInstructions[lineIndex].fields.push({
      name: newFieldName,
      startPos: '',
      endPos: '',
    });
    setLineInstructions(updatedInstructions);
  };

  const addLine = (newLine) => {
    // Verificar se já existe um startLine e endLine iguais aos que estão sendo adicionados
    const lineExists = lineInstructions.some((line) => {
      return (
        line.startLine == newLine.startLine ||
        line.endLine == newLine.endLine ||
        newLine.startLine == line.endLine
      );
    });

    //console.log(lineExists);

    if (lineExists) {
      alert('Essa linha já existe.');
      return;
    } else {
      setLineInstructions((prevInstructions) => [
        ...prevInstructions,
        { ...newLine },
      ]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLine({ startLine, endLine, fields: [] });
    setStart('');
    setEndLine('');
  };

  return (
    <div>
      {/*       <pre> {JSON.stringify(lineInstructions, null, 2)} </pre>
       */}
      <div>
        <h1>Adicionar nova linha</h1>
        <form onSubmit={handleSubmit}>
          <div>
            Começo linha{' '}
            <input
              type="text"
              value={startLine}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div>
            Fim linha{' '}
            <input
              type="text"
              value={endLine}
              onChange={(e) => setEndLine(e.target.value)}
            />
          </div>
          <input type="submit" value="Adicionar" />
        </form>
      </div>

      <div>
        {lineInstructions.map((line, lineIndex) => (
          <div
            style={{ backgroundColor: 'rgba(0,0,0,.1)', marginTop: '10%' }}
            key={lineIndex}
          >
            <p>
              Linha de início: {line.startLine} | Linha final: {line.endLine}
            </p>
            {line.fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <p>Nome do campo: {field.name}</p>
                <label>
                  Posição inicial:
                  <input
                    type="text"
                    value={field.startPos}
                    onChange={(e) =>
                      handleFieldChange(
                        lineIndex,
                        fieldIndex,
                        'startPos',
                        e.target.value
                      )
                    }
                  />
                </label>
                <br />
                <label>
                  Posição final:
                  <input
                    type="text"
                    value={field.endPos}
                    onChange={(e) =>
                      handleFieldChange(
                        lineIndex,
                        fieldIndex,
                        'endPos',
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
            ))}

            <input type='text' onChange={ (e) => setNewFieldName((e.target.value))} placeholder='Nome do campo'/>
            <button
              style={{ margin: '3%' }}
              onClick={() => handleAddField(lineIndex,newFieldName)}
            >
              Adicionar novo campo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;
