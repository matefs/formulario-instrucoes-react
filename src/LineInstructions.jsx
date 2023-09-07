import React, { useState } from 'react';

function Form({ lineInstructions, setLineInstructions }) {
  const [startLine, setStart] = useState('');
  const [endLine, setEndLine] = useState('');

  const [newFieldName, setNewFieldName] = useState('');


  const handleAddField = (lineIndex, newFieldName) => {
    let lineInstructionNameAlreadyExist = lineInstructions[
      lineIndex
    ].fields.some(
      (item) => item.name.toLowerCase() == newFieldName.toLowerCase()
    );

    if (lineInstructionNameAlreadyExist) {
      alert('Nome de campo ja existe');
      return;
    } else {
      const updatedInstructions = [...lineInstructions];
      updatedInstructions[lineIndex].fields.push({
        name: newFieldName,
        startPos: '',
        endPos: '',
      });
      setLineInstructions(updatedInstructions);
    }
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

  const handleFieldInitialFinalPosition = (event) => {
    event.preventDefault();

    let posicaoInicial = event.target[0].value;
    let posicaoFinal = event.target[1].value;
    let indiceLinha = event.target[2].value;
    let indiceCampo = event.target[3].value;

    /*       let jaExistePosicaoInicialFinalBooleano = updatedInstructions[indiceLinha].fields[indiceCampo].some((item) => item.startPos == posicaoInicial )
      console.log(jaExistePosicaoInicialFinalBooleano) */

      

    const updatedInstructions = [...lineInstructions];
    updatedInstructions[indiceLinha].fields[indiceCampo].startPos =
      posicaoInicial;
    updatedInstructions[indiceLinha].fields[indiceCampo].endPos = posicaoFinal;

    setLineInstructions(updatedInstructions);
  };

  return (
    <div>
      {/*       {      <pre> {JSON.stringify(lineInstructions, null, 2)} </pre>
      } */}
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
              <form
                key={fieldIndex}
                onSubmit={(event) => handleFieldInitialFinalPosition(event)}
              >
                <div>
                  <p>Nome do campo: {field.name}</p>
                  <label>
                    Posição inicial:
                    <input type="text" defaultValue={field.startPos} />
                  </label>
                  <br />
                  <label>
                    Posição final:
                    <input type="text" defaultValue={field.endPos} />
                  </label>
                  <br />
                  <br />
                  <input value={lineIndex} style={{ display: 'none' }} />
                  <input value={fieldIndex} style={{ display: 'none' }} />
                  <button type="submit">Salvar instruções</button>
                </div>
              </form>
            ))}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.target.reset(); // Redefine o formulário para limpar os campos
              }}
            >
              <input
                type="text"
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="Nome do novo campo"
              />
              <button
                style={{ margin: '3%' }}
                onClick={() => handleAddField(lineIndex, newFieldName)}
                type="submit"
              >
                Adicionar novo campo
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;
