import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const ModalComponent = ({ showModal, closeModal, padding, height, width, backgroundColor, titulo, children }) => {
  if (!showModal) return null; // No renderizar el modal si showModal es false

  return ReactDOM.createPortal(
    <Backdrop onClick={closeModal}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()} 
        padding={padding}
        height={height}
        width={width}
        backgroundColor={backgroundColor}
      >
        <ContentContainer>
          <h2>{titulo}</h2>
          {children}
        </ContentContainer>
      </ModalContainer>
    </Backdrop>,
    document.getElementById('modal-root') // Renderizamos el Backdrop fuera del flujo principal
  );
};

// Estilos del Backdrop y ModalContainer
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.backgroundColor || 'white'}; 
  padding: ${(props) => props.padding || '20px'};
  height: ${(props) => props.height || 'auto'}; 
  width: ${(props) => props.width || '100%'}; 
  max-width: 500px; 
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1001; 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;