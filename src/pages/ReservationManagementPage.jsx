// ReservationManagementPage.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap"; // Importar GSAP

export const ReservationManagementPage = () => {
    const pageRef = useRef(null); // Referencia al contenedor principal de la página

    useEffect(() => {
        // Animación de entrada cuando el componente se monta
        gsap.fromTo(
            pageRef.current,
            { opacity: 0, x: -100 }, // Estado inicial (opacidad 0 y desplazado hacia la izquierda)
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" } // Estado final (opacidad 1 y posición original)
        );
    }, []); // Array de dependencias vacío para que solo se ejecute al montar

    return (
        <div ref={pageRef}>
            <h1>Administrar Reservas</h1>
            <p>Aquí puedes gestionar todas las reservas.</p>
            {/* Más contenido de la página */}
        </div>
    );
};
