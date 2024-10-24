import React from "react";
import { ModalComponent } from "../ModalComponent"; // Asegúrate de tener el path correcto
import styled from "styled-components";

export const LeerPoliticasDeAcuerdoModal = ({ showModal, closeModal }) => {
  return (
    <ModalComponent showModal={showModal} closeModal={closeModal} titulo="Políticas de uso">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique mi, eget facilisis enim. 
        Phasellus eget tincidunt felis. Duis a risus sit amet elit facilisis convallis. Quisque quis orci lectus. 
        Sed malesuada quam vel elit tincidunt, id luctus neque bibendum. Vestibulum vitae ultricies velit. 
        Vestibulum sit amet tortor dapibus, accumsan est nec, condimentum nisi.
      </p>
      <Button onClick={closeModal}>Cerrar</Button>
    </ModalComponent>
  );
};

// Estilo para el botón dentro del modal
const Button = styled.button`
  background-color: #5baef1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;