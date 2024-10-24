import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation para detectar la URL actual
import { gsap } from "gsap";
import { PiUsersThree, PiUsersThreeFill } from "react-icons/pi";
import { RiUserAddLine, RiUserAddFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { PiPackageLight, PiPackageFill } from "react-icons/pi";
import { IoDocumentTextOutline, IoDocumentTextSharp } from "react-icons/io5";
import { GrCircleQuestion } from "react-icons/gr";
import { IoMegaphoneOutline, IoLogOutOutline } from "react-icons/io5";
import { PiCalendar, PiCalendarFill } from "react-icons/pi";
import { FaCog } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5"; // Iconos para expandir/contraer

export const SideBar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // Hook para obtener la URL actual
  const sideBarRef = useRef(null); // Referencia al contenedor del sidebar
  const itemRefs = useRef([]); // Referencias para los elementos individuales

  const DataItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <PiUsersThree />,
      activeIcon: <PiUsersThreeFill />,
      path: "/",
    },
    // {
    //   id: 2,
    //   name: "Productos",
    //   icon: <RiUserAddLine />,
    //   activeIcon: <RiUserAddFill />,
    //   path: "/productos",
    // },
    {
      id: 3,
      name: "Inventario",
      icon: <PiPackageLight />,
      activeIcon: <PiPackageFill />,
      path: "/inventario",
    },
    {
      id: 4,
      name: "Categorías",
      icon: <IoDocumentTextOutline />,
      activeIcon: <IoDocumentTextSharp />,
      path: "/categorias",
    },
    {
      id: 5,
      name: "Empresa",
      icon: <PiCalendar />,
      activeIcon: <PiCalendarFill />,
      path: "/empresa",
    },
    {
      id: 6,
      name: "Config",
      icon: <FaCog />,
      activeIcon: <FaCog />,
      path: "/configuraciones",
    },
  ];

  // Determina el ítem activo en base a la URL actual
  const getActiveItemId = () => {
    const currentItem = DataItems.find((item) => item.path === location.pathname);
    return currentItem ? currentItem.id : 1; // Devuelve el ID del ítem activo o 1 por defecto
  };

  const [activeItem, setActiveItem] = useState(getActiveItemId); // Establece el ítem activo en base a la URL actual

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

  // Actualiza el ítem activo cuando cambie la URL
  useEffect(() => {
    setActiveItem(getActiveItemId);
  }, [location.pathname]);

  // Animación de apertura y cierre del sidebar
  useEffect(() => {
    if (isOpen) {
      gsap.to(sideBarRef.current, {
        width: "250px",
        duration: 0,
        ease: "power3.out",
      });
    } else {
      gsap.to(sideBarRef.current, {
        width: "90px",
        duration: 0,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <SideBarContainer ref={sideBarRef} isOpen={isOpen}>
      <ToggleSidebarButton onClick={toggleSidebar}>
        {isOpen ? <IoChevronBack /> : <IoChevronForward />}
      </ToggleSidebarButton>
      <LogoContainer>{isOpen ? "Menú" : <FaReact />}</LogoContainer>
      {DataItems.map((item, index) => (
        <ElementContainer
          key={item.id}
          ref={(el) => (itemRefs.current[index] = el)}
        >
          <NavItem
            to={item.path}
            isActive={activeItem === item.id} // Condición para determinar si está activo
            onClick={() => setActiveItem(item.id)} // Cambia el ítem activo al hacer clic
          >
            <IconContainer>
              {activeItem === item.id ? item.activeIcon : item.icon}{" "}
              {/* Cambia el ícono según el estado activo */}
            </IconContainer>
            {isOpen && <span>{item.name}</span>}
          </NavItem>
        </ElementContainer>
      ))}

      {/* Footer */}
      <FooterContainer>
        <NavItem style={{ justifyContent: "center" }}>
          <IconContainer>
            <GrCircleQuestion />
          </IconContainer>
          {isOpen && <span>Ayuda</span>}
        </NavItem>
        <NavItem style={{ justifyContent: "center" }}>
          <IconContainer>
            <IoMegaphoneOutline />
          </IconContainer>
          {isOpen && <span>Feedback</span>}
        </NavItem>
        <NavItem style={{ justifyContent: "center" }}>
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
  right: -20px; // Si isOpen es true, está más a la derecha
  border: none;
  width: 30px;
  height: 30px;
  display: ${(props) =>
    props.isOpen
      ? "none"
      : "flex"}; // Cambia la visibilidad dependiendo de isOpen
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 4px 8px 8px rgba(0, 0, 0.2, 0.2);
  z-index: 1000;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const SideBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.2s ease-in-out;
  gap: 10px;
`;

const LogoContainer = styled.div`
  font-size: clamp(12px, 2vw, 40px);
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
  align-items: center;
`;

const ElementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  width: 80%;
  padding: 10px;
  text-decoration: none;
  gap: 10px;
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
  border-radius: 5px;
  font-size: clamp(18px, 1vw, 30px);
  background-color: ${(props) =>
    props.isActive ? "rgb(0, 102, 255)" : "transparent"};
  &:hover {
    background-color: rgb(100, 162, 255);
    color: #ffff;
  }

  span {
    opacity: ${(props) => (props.isOpen ? 0 : 1)};
    transition: opacity 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
  }

  @media (max-height: 520px) {
    font-size: clamp(12px, 1vw, 30px);
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    align-self: center;
  }
`;

const FooterContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;

  @media (max-height: 520px) {
    flex-direction: row;
    gap: 0px;

    span {
      display: none;
    }
  }
`;




export default SideBar;