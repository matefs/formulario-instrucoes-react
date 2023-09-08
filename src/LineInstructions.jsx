import React, { useState } from 'react';

function LineInstructionsForm({ lineInstructions, setLineInstructions }) {
  const [startLine, setStart] = useState();
  const [endLine, setEndLine] = useState();

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
    newLine.startLine = Number(newLine.startLine);
    newLine.endLine = Number(newLine.endLine);

    // Verificar se já existe um startLine e endLine iguais aos que estão sendo adicionados
    const lineExists = lineInstructions.some((line) => {
      return (
        line.startLine === newLine.startLine ||
        line.endLine === newLine.endLine ||
        newLine.startLine === line.endLine
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

    let posicaoInicial = Number(event.target[0].value);
    let posicaoFinal = Number(event.target[1].value);
    let indiceLinha = Number(event.target[2].value);
    let indiceCampo = Number(event.target[3].value);

    const updatedInstructions = [...lineInstructions];
    let nomeCampoIndividual =
      updatedInstructions[indiceLinha].fields[indiceCampo].name;

    let impedirSalvamento = false;

    updatedInstructions[indiceLinha].fields.map((InteractedField) => {
      /* Valida se em outros campos dessa mesma linha já existe essa posição inicial e final  */
      if (InteractedField.name != nomeCampoIndividual) {
        if (
          InteractedField.startPos == posicaoInicial ||
          InteractedField.endPos == posicaoFinal
        ) {
          alert(
            `Já existe um campo com essa posicao inicia ou final no campo ${InteractedField.name}`
          );
          impedirSalvamento = true;
        }
      }
    });

    posicaoInicial <= posicaoFinal
      ? null
      : (function () {
          alert('A posicao inicial não pode ser maior do que a final');
          impedirSalvamento = true;
        })();

    impedirSalvamento == true
      ? null
      : (function () {
          updatedInstructions[indiceLinha].fields[indiceCampo].startPos =
            posicaoInicial;
          updatedInstructions[indiceLinha].fields[indiceCampo].endPos =
            posicaoFinal;
          setLineInstructions(updatedInstructions);
        })();
  };

  return (
    <div>
      {/*<pre> {JSON.stringify(lineInstructions, null, 2)} </pre> */}

      <div>
        <h1>Adicionar nova linha</h1>
        <form onSubmit={handleSubmit}>
          <div>
            Começo linha{' '}
            <input
              type="number"
              value={startLine}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div>
            Fim linha{' '}
            <input
              type="number"
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

export default LineInstructionsForm;
