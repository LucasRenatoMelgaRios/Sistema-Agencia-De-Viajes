// SettingsPage.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const SettingsPage = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        // Animación de entrada cuando el componente se monta
        gsap.fromTo(
            pageRef.current,
            { opacity: 0, x: -100 }, // Estado inicial (opacidad 0 y desplazado hacia la izquierda)
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" } // Estado final (opacidad 1 y posición original)
        );
    }, []); 

    return (
        <div ref={pageRef}>
            <h1>Settings Page</h1>
            <p>Aquí puedes cambiar la configuración del sistema.</p>
        </div>
    );
};
