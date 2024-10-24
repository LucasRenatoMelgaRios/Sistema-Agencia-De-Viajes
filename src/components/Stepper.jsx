import React from 'react';
import { Check } from 'lucide-react';
import styled from 'styled-components';

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px; /* Reservar un ancho fijo para todos los pasos */
`;

const StepButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  transition: all 200ms ease-in-out;
  
  ${({ status }) => {
    switch (status) {
      case 'completed':
        return `
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
        `;
      case 'current':
        return `
          border-color: #3b82f6;
          color: #3b82f6;
        `;
      default:
        return `
          border-color: #d1d5db;
          color: #d1d5db;
        `;
    }
  }}

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
  }
`;

const StepLabel = styled.span`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  ${({ status }) => status === 'completed' || status === 'current'
    ? 'color: #3b82f6; font-weight: 500;'
    : 'color: #6b7280;'
  }

  @media (max-width: 570px) {
    visibility: ${({ isCurrent }) => (isCurrent ? 'visible' : 'hidden')};
    height: 0.875rem; /* Mantener el espacio reservado aunque esté oculto */
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.625rem;
  }
`;

const StepConnector = styled.div`
  flex: 1;
  height: 0.125rem;
  background-color: ${({ completed }) => completed ? '#3b82f6' : '#d1d5db'};

  @media (max-width: 768px) {
    height: 0.1rem;
  }

  @media (max-width: 480px) {
    height: 0.075rem;
  }
`;

const Stepper = ({ steps, currentStep, onStepChange }) => {
  return (
    <StepperContainer>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <StepContainer>
            <StepButton
              status={index < currentStep ? 'completed' : index === currentStep ? 'current' : 'incomplete'}
              onClick={() => onStepChange(index)}
            >
              {index < currentStep ? (
                <Check size={16} />
              ) : (
                <span>{index + 1}</span>
              )}
            </StepButton>
            <StepLabel
              status={index <= currentStep ? 'completed' : 'incomplete'}
              isCurrent={index === currentStep}  // Verifica si es el paso actual
            >
              {step}
            </StepLabel>
          </StepContainer>
          {index < steps.length - 1 && (
            <StepConnector completed={index < currentStep} />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};

export default Stepper;