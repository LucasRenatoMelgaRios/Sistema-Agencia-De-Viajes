import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { gsap } from "gsap";

export const NotificationComponent = ( { backgroundColor, textColor, title } ) => {
    const notificationRef = useRef(null); // Referencia para el contenedor de la notificación
    const progressBarRef = useRef(null);  // Referencia para la barra de progreso
    const timerRef = useRef(null);        // Referencia para el temporizador


    useEffect(() => {
        // Animación de entrada desde arriba
        gsap.fromTo(
          notificationRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
    
        // Animación de la barra de progreso
        gsap.to(progressBarRef.current, {
          width: '100%', // Llena la barra completamente
          duration: 2,   // La duración de la animación es de 5 segundos
          ease: "linear",
        });
    
        // Temporizador para cerrar la notificación después de 5 segundos
        timerRef.current = setTimeout(() => {
          closeNotification();
        }, 5000);
    
        // Limpieza de temporizador cuando el componente se desmonte
        return () => clearTimeout(timerRef.current);
      }, []);
    
      // Función para cerrar la notificación
      const closeNotification = () => {
        // Limpia el temporizador
        clearTimeout(timerRef.current);
    
        // Animación de salida hacia arriba
        gsap.to(notificationRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            console.log("Notificación finalizada");
          },
        });
      };

    return (
        <NotiticationContainer backgroundColor={backgroundColor}  style={{flexDirection:"column"}} ref={notificationRef}>
            <MainContainerText>
                <Container>
                    <FaCheckCircle />
                    <Text textColor={textColor}>{title}</Text>
                </Container>
                <Container>
                    <Text>|</Text>
                    <CloseIcon onClick={closeNotification}>
                    <FaRegCircleXmark />

                    </CloseIcon>
                </Container>
            </MainContainerText>
            {/* Barra de progreso */}
            <ProgressBarContainer>
                <ProgressBar ref={progressBarRef} />
            </ProgressBarContainer>
        </NotiticationContainer>
    );
};

// Estilos de los componentes
const NotiticationContainer = styled.div`
  width: clamp(300px, 4vw, 400px);
  display: flex;
  background-color: ${(props) => props.backgroundColor || '#08dd48'}; /* Color de fondo dinámico desde props */
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 20px;
  position: fixed;
  top: 20px;
  left: 50%;
  overflow: hidden;
  transform: translateX(-50%);
  max-height: 65px;

  @media (max-width: 400px) {
    width: clamp(260px, 3vw, 300px);
  }
`;

const Text = styled.span`
  font-weight: bold;
  font-size: clamp(12px, 0.8vw, 22px);
  color: ${(props) => props.textColor || '#ffff'}; /* Color de texto dinámico desde props */
  white-space: nowrap;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 19px;
  height: 100%;

  svg {
    color: #ffff;
    font-size: clamp(12px, 0.8vw, 22px);
  }
`;

const MainContainerText = styled.div`
    display: flex;

`;

// Contenedor de la barra de progreso
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  overflow: hidden;
`;

// Barra de progreso que se llena de izquierda a derecha
const ProgressBar = styled.div`
  width: 0; /* Empieza vacía */
  height: 100%;
  background-color: white;
  transition: width 3s linear; /* La duración y la transición de llenado */
`;

const CloseIcon = styled.div`
  cursor: pointer; /* Cursor de mano para indicar que es clicable */
  
  svg {
    color: ${(props) => props.textColor || '#ffff'};
    font-size: clamp(12px, 0.8vw, 22px);
  }
`;