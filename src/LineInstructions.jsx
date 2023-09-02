import React, { useState } from 'react';

function Form({lineInstructions,setLineInstructions}) {
  const [startLine, setStart] = useState('');
  const [endLine, setEndLine] = useState('');

  const [newFieldName, setNewFieldName] = useState('')

  const handleFieldChange = (lineIndex, fieldIndex, key, value) => {
    const updatedInstructions = [...lineInstructions];
    updatedInstructions[lineIndex].fields[fieldIndex][key] = value;
    setLineInstructions(updatedInstructions);
  };

  const handleAddField = (lineIndex,newFieldName) => {
    let lineInstructionNameAlreadyExist = lineInstructions[lineIndex].fields.some((item) => item.name.toLowerCase() == newFieldName.toLowerCase());

    if(lineInstructionNameAlreadyExist){
      alert('Nome de campo ja existe')
      return 
    }else{
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
                <br />
                <button> salvar instrucoes </button>
              </div>
            ))}

<form onSubmit={(e) =>  {e.preventDefault(); e.target.reset(); // Redefine o formulário para limpar os campos
}}>
            <input type='text' onChange={ (e) => setNewFieldName((e.target.value))} placeholder='Nome do novo campo'/>
            <button
              style={{ margin: '3%' }}
              onClick={() => handleAddField(lineIndex,newFieldName)}
              type='submit'
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
