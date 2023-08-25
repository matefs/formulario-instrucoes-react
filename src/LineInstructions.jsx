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

  /*   
  TODO: make the correct name when added a new line
   */

  const [startLine, setStart] = useState('');
  const [endLine, setEndLine] = useState('');

  const addLine = (newLine) => {
    // Verificar se já existe um startLine e endLine iguais aos que estão sendo adicionados
    const existingLine = lineInstructions.find(function (line) {
      console.log(line);
      line.startLine === newLine.startLine && line.endLine === newLine.endLine;
    });

    if (existingLine) {
      console.log('Essa linha já existe.');
      return; // Não adiciona a linha se já existir uma correspondente
    }

    setLineInstructions((prevInstructions) => [
      ...prevInstructions,
      { ...newLine },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLine({ startLine, endLine });
    setStart('');
    setEndLine('');
  };

  return (
    <div>
      <pre> {JSON.stringify(lineInstructions, null, 2)} </pre>

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
    </div>
  );
}

export default Form;
