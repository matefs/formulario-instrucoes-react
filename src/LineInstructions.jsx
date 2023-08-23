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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform form submission logic here
    console.log(formData);
  };
 
  return (
    <div>
      <pre> {JSON.stringify(lineInstructions, null, 2)} </pre>

      <div>
        <h1> Adicionar nova linha </h1>
        Começo linha <input />
        Fim linha <input />
        <input type="submit" />
      </div>
    </div>
  );
}

export default Form;
