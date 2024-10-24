import React from "react";
import styled, { keyframes } from "styled-components";

// Definimos la animación con keyframes
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Componente contenedor de la animación
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  height: 100vh; /* Ocupa el alto de la pantalla */
`;

// Cambiamos el nombre del styled component a Spinner
export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  background-color: #2202d6;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 130px;
  margin-left: 20px;
`;

export const LoadingSpinner = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default LoadingSpinner;