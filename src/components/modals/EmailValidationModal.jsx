import React, { useState, useRef } from "react";
import { ModalComponent } from "../ModalComponent";
import styled from "styled-components";

export const EmailValidationModal = ({ showModal, closeModal }) => {
  const [code, setCode] = useState(["", "", "", ""]); // Estado para los 4 dígitos

  const inputRefs = useRef([]); // Referencias a los inputs

  // Manejar el cambio en los inputs
  const handleCodeChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;

    if (e.target.value && index < 3) {
      // Mover el foco al siguiente input
      inputRefs.current[index + 1].focus();
    }

    setCode(newCode);
  };

  // Función para reenviar el correo
  const handleResendEmail = () => {
    alert("Se ha reenviado el correo de validación.");
  };

  return (
    <ModalComponent showModal={showModal} closeModal={closeModal} padding="5%" backgroundColor="#fff">
      <h2>Validación de Correo</h2>
      <p>Ingresa el código de 4 dígitos que te enviamos al correo.</p>
      <CodeInputContainer>
        {code.map((digit, index) => (
          <CodeInput
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleCodeChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)} // Asignar la referencia al input actual
          />
        ))}
      </CodeInputContainer>
      <Button onClick={closeModal}>Validar</Button>
      <Message>
        ¿No te llegó el correo?{" "}
        <ResendLink onClick={handleResendEmail}>Volver a enviar</ResendLink>
      </Message>
    </ModalComponent>
  );
};

// Contenedor de los inputs del código
const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

// Estilo de cada input
const CodeInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 20px;
  border: 2px solid #d1d5db;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;

  &:focus {
    outline: none;
    border-color: #5baef1;
  }
`;

const Button = styled.button`
  background-color: #5baef1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #333;
`;

const ResendLink = styled.span`
  color: #5baef1;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;