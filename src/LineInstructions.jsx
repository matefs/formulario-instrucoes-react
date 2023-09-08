import React, { useState } from 'react';
import { Input, Form, Button, Card } from 'antd';

function LineInstructionsForm({ lineInstructions, setLineInstructions }) {
  const [startLine, setStart] = useState();
  const [endLine, setEndLine] = useState();
  const [addNewLineEmpatyWithFieldsForm] = Form.useForm();

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

    /* Validacao se ja existe ou se inicial é maior que final */
    if(newLine.startLine > newLine.endLine ){
      alert('A linha inicial não pode ser maior que a linha final ');
      return;
    } else {
      if (lineExists) {
        alert('Essa linha já existe.');
        return;
      } else {
        setLineInstructions((prevInstructions) => [
          ...prevInstructions,
          { ...newLine },
        ]);
      }
    }

  };

  const handleSubmit = (values) => {
//    event.preventDefault();
    const newLine = {
      startLine: values.startLine,
      endLine: values.endLine,
      fields: [],
    };
    addLine(newLine);;
    setStart('');
    setEndLine('');
    addNewLineEmpatyWithFieldsForm.resetFields();
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
    
    { <pre style={{ position: 'fixed', top: '10px', right: '10px', textShadow:'1px 1px white', zIndex:999}}>
    {JSON.stringify(lineInstructions, null, 2)}
    </pre> }


<div>
        <h1>Adicionar nova linha</h1>
        <Form
          form={addNewLineEmpatyWithFieldsForm}
          onFinish={handleSubmit}
          initialValues={{ startLine: '', endLine: '' }}

        >
          <Form.Item
            label="Começo linha"
            name="startLine"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
            defaultValue={''}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Fim linha"
            name="endLine"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
            defaultValue={''}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
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
