import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gsap } from "gsap"; // Importa GSAP

// Importación de íconos con y sin relleno
import { PiUsersThree, PiUsersThreeFill } from "react-icons/pi";
import { RiUserAddLine, RiUserAddFill } from "react-icons/ri";
import { PiPackageLight, PiPackageFill } from "react-icons/pi";
import { IoDocumentTextOutline, IoDocumentTextSharp } from "react-icons/io5";
import { PiMoneyWavyLight, PiMoneyWavyFill } from "react-icons/pi";
import { PiCalendar, PiCalendarFill } from "react-icons/pi";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { GrCircleQuestion } from "react-icons/gr";
import { IoMegaphoneOutline, IoLogOutOutline } from "react-icons/io5";
import { IoChevronBack, IoChevronForward } from "react-icons/io5"; // Iconos para expandir/contraer
import { FaReact } from "react-icons/fa";

export const SideBar = ({ isOpen, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState(1); // Estado para el ítem activo
    const sideBarRef = useRef(null); // Referencia al contenedor del sidebar
    const itemRefs = useRef([]); // Referencias para los elementos individuales

    const DataItems = [
        {
            id: 1,
            name: "Administrar Usuarios",
            icon: <PiUsersThree />,
            activeIcon: <PiUsersThreeFill />,
            path: "/",
        },
        {
            id: 2,
            name: "Registro De Clientes",
            icon: <RiUserAddLine />,
            activeIcon: <RiUserAddFill />,
            path: "/client-registration",
        },
        {
            id: 3,
            name: "Paquetes Turísticos",
            icon: <PiPackageLight />,
            activeIcon: <PiPackageFill />,
            path: "/user-management",
        },
        {
            id: 4,
            name: "Reporte de Ventas",
            icon: <IoDocumentTextOutline />,
            activeIcon: <IoDocumentTextSharp />,
            path: "/sales-report",
        },
        {
            id: 5,
            name: "Administrar reservas",
            icon: <PiCalendar />,
            activeIcon: <PiCalendarFill />,
            path: "/reservation-management",
        },
        {
            id: 6,
            name: "Depósitos",
            icon: <PiMoneyWavyLight />,
            activeIcon: <PiMoneyWavyFill />,
            path: "/deposits",
        },
        {
            id: 7,
            name: "Opciones",
            icon: <IoSettingsOutline />,
            activeIcon: <IoSettingsSharp />,
            path: "/settings",
        },
    ];

    // Animación de entrada para el sidebar y sus elementos
    useEffect(() => {
        gsap.fromTo(
            sideBarRef.current,
            { x: -300, opacity: 0 }, // Estado inicial fuera de la pantalla y sin opacidad
            { x: 0, opacity: 1, duration: 0.2, ease: "power3.out" } // Estado final en su posición y visible
        );

        gsap.fromTo(
            itemRefs.current,
            { x: -50, opacity: 0 }, // Los elementos inician desplazados y ocultos
            { x: 0, opacity: 1, duration: 0.2, ease: "power3.out", stagger: 0.1 } // Los elementos se muestran con un retraso
        );
    }, []);

    // Animación de apertura y cierre del sidebar
    useEffect(() => {
        if (isOpen) {
            gsap.to(sideBarRef.current, { width: "250px", duration: 0, ease: "power3.out" });
        } else {
            gsap.to(sideBarRef.current, { width: "60px", duration: 0, ease: "power3.in" });
        }
    }, [isOpen]);
    
    

    return (
        <SideBarContainer ref={sideBarRef} isOpen={isOpen}>
            <ToggleSidebarButton onClick={toggleSidebar}>
                {isOpen ? <IoChevronBack /> : <IoChevronForward />}
            </ToggleSidebarButton>
            <LogoContainer>{isOpen ? "Tu Logo" : <FaReact />}</LogoContainer>
            {DataItems.map((item, index) => (
                <ElementContainer key={item.id} ref={(el) => (itemRefs.current[index] = el)}>
                    <NavItem
                        to={item.path}
                        isActive={activeItem === item.id} // Condición para determinar si está activo
                        onClick={() => setActiveItem(item.id)} // Cambia el ítem activo al hacer clic
                    >
                        <IconContainer>
                            {activeItem === item.id ? item.activeIcon : item.icon} {/* Cambia el ícono según el estado activo */}
                        </IconContainer>
                        {isOpen && <span>{item.name}</span>}
                    </NavItem>
                </ElementContainer>
            ))}
            <FooterContainer>
                <NavItem>
                    <IconContainer>
                        <GrCircleQuestion />
                    </IconContainer>
                    {isOpen && <span>Ayuda</span>}
                </NavItem>
                <NavItem>
                    <IconContainer>
                        <IoMegaphoneOutline />
                    </IconContainer>
                    {isOpen && <span>Feedback</span>}
                </NavItem>
                <NavItem>
                    <IconContainer>
                        <IoLogOutOutline />
                    </IconContainer>
                    {isOpen && <span>Cerrar Sesión</span>}
                </NavItem>
            </FooterContainer>
        </SideBarContainer>
    );
};

// Botón para abrir/cerrar el sidebar
const ToggleSidebarButton = styled.button`
    position: absolute;
    top: 20px;
    right: -20px;
    background-color: white;
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const SideBarContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    padding: 20px;
    transition: width 0.2s ease-in-out;
    overflow: hidden
`;

const LogoContainer = styled.div`
    font-size: clamp(12px, 2vw, 40px);
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
`;

const ElementContainer = styled.div``;

const NavItem = styled(Link)`
display: flex;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    gap: 10px;
    color: ${(props) => (props.isActive ? "#000000" : "#3b3b3b")}; // Texto negro si está activo, gris si no
    border-radius: 5px;
    font-size: clamp(18px, 1vw, 30px);
    background-color: ${(props) => (props.isActive ? "rgba(0, 0, 0, 0.05)" : "transparent")}; // Fondo diferente si está activo
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    span {
        opacity: ${(props) => (props.isOpen ? 0 : 1)};
        transition: opacity 0.3s ease; /* Transición suave para la opacidad */
        white-space: nowrap; /* Para evitar que el texto se desborde */
        overflow: hidden; /* Ocultar texto que se desborde */
    }
;
`;




const IconContainer = styled.div`
    svg {
        width: 24px;
        height: 24px;
    }
`;

const FooterContainer = styled.div`
    margin-top: auto;
`;

export default SideBar;
