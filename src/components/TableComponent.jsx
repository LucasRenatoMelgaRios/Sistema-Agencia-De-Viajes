import styled from 'styled-components';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner"; // Importamos el spinner

export const TableComponent = ({ titles, elements, onEdit }) => {
  const [loadingImages, setLoadingImages] = useState({}); // Estado para controlar la carga de las imágenes

  const handleImageLoad = (id) => {
    setLoadingImages((prevState) => ({ ...prevState, [id]: false })); // Imagen cargada, remover el spinner
  };

  const handleImageError = (id) => {
    setLoadingImages((prevState) => ({ ...prevState, [id]: false })); // Manejar error en la carga
  };

  const renderCellContent = (element, title, index) => {
    const keyMappings = {
      'Imagen': 'imagen',
      'Usuario': 'usuario',
      'Nombre': 'nombre',
      'Correo': 'correo',
      'Estado': 'activo',  // Cambiar clave a 'activo'
      'Acción': 'action'
    };
  
    const key = keyMappings[title] || title.toLowerCase();
  
    // Mostrar imagen
    if (key === 'imagen') {
      return (
        <TableCell key={index} data-title={title}>
          {loadingImages[element.id] ? (
            <SpinnerContainer>
              <LoadingSpinner /> {/* Mostrar spinner mientras se carga la imagen */}
            </SpinnerContainer>
          ) : (
            <ElementImage
              src={element[key]}
              alt={element.nombre || 'Imagen'}
              onLoad={() => handleImageLoad(element.id)} // Al cargar la imagen, actualizar el estado
              onError={() => handleImageError(element.id)} // Manejar error en la carga
            />
          )}
        </TableCell>
      );
    }
  
    // Mostrar estado "Activo" o "Inactivo"
    if (key === 'activo') {
      const isActive = element[key] === true || element[key] === "true" || element[key] === 1 || element[key] === "1";

      return (
        <TableCell key={index} data-title={title}>
          <StatusBadge status={element[key]}>
          {isActive ? 'Activo' : 'Inactivo'}
          </StatusBadge>
        </TableCell>
      );
    }
  
    // Acciones (editar, eliminar)
    if (key === 'action') {
      return (
        <TableCell key={index} data-title={title}>
          <ActionButton onClick={() => onEdit(element)}>
            <HiOutlinePencilSquare />
          </ActionButton>
          <ActionButton delete>
            <MdDeleteOutline />
          </ActionButton>
        </TableCell>
      );
    }
  
    const value = element[key] || 'Sin datos';
    return <TableCell key={index} data-title={title}>{value}</TableCell>;
  };
  
  
  return (
    <ResponsiveTableContainer>
      <TableGrid>
        <HeaderRow>
          {titles.map((title, index) => (
            <HeaderCell key={index}>{title}</HeaderCell>
          ))}
        </HeaderRow>
        <TableBody>
          {elements.map((element) => (
            <TableRow key={element.id || Math.random()}>
              {titles.map((title, index) => renderCellContent(element, title, index))}
            </TableRow>
          ))}
        </TableBody>
      </TableGrid>
    </ResponsiveTableContainer>
  );
};

TableComponent.defaultProps = {
  titles: [],
  elements: [],
};

// Estilos
const ResponsiveTableContainer = styled.div`
 width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow-x: auto; /* Habilita el scroll horizontal si es necesario */
  overflow-y: auto; /* Permite que la tabla tenga scroll vertical si es necesario */
  max-height: 100vh; /* Asegura que la tabla no crezca más que la altura de la pantalla */
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);

  @media (max-width: 768px) {
    overflow-x: auto; /* Permitir el desplazamiento horizontal en pantallas más pequeñas */
    -webkit-overflow-scrolling: touch;
  }
`;

const TableGrid = styled.div`
  width: 100%;
  display: table;
  border-collapse: collapse;
  @media (max-width: 768px) {
    display: block;
  }
`;

const HeaderRow = styled.div`
  display: table-row;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  @media (max-width: 768px) {
    display: none; /* Ocultar la fila de encabezado en pantallas pequeñas */
  }
`;

const TableBody = styled.div`
  display: table-row-group;
  @media (max-width: 768px) {
    display: block;
  }
`;

const TableRow = styled.div`
  display: table-row;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }

  &:hover {
    background-color: #f9fafb;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column; /* Mostrar cada fila como una columna en pantallas pequeñas */
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem; /* Añadir margen entre filas */
  }
`;

const HeaderCell = styled.div`
  display: table-cell;
  padding: 0.75rem 1rem;
  font-weight: 600;
  text-align: center;
  color: #374151;
  text-transform: capitalize;
  vertical-align: middle;
  white-space: nowrap;
`;
const TableCell = styled.div`
  display: table-cell;
  padding: 0.75rem 1rem;
  text-align: center;
  vertical-align: middle;
  color: #4b5563;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    position: relative;

    /* Pseudo-element for displaying title in mobile view */
    &:before {
      content: attr(data-title); /* Ensure data-title is set dynamically */
      font-weight: bold;
      text-transform: capitalize;
      margin-right: 0.5rem;
      color: #374151;
      flex-shrink: 0; /* Prevent shrinking of the label */
      width: 35%; /* Reserve a portion of the space for the title */
    }

    /* The actual cell content */
    div {
      width: 65%; /* Reserve the rest of the space for the value */
      text-align: right;
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px; /* Altura del contenedor para centrar el spinner */
`;

const ElementImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const NoDataText = styled.span`
  color: #9ca3af;
  font-style: italic;
  font-size: 0.875rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  margin: 0 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.delete ? '#fee2e2' : '#e5e7eb'};
  }

  svg {
    color: ${props => props.delete ? '#ef4444' : '#374151'};
    font-size: 1.25rem;
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

// Estilo para las etiquetas de estado
const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  color: white;
  width: 80px;
  background-color: ${props => {
    // Ajusta los colores basados en el contenido de texto
    if (props.children === "Activo") {
      return "#34d399"; // Verde para "Activo"
    } else {
      return "#f87171"; // Rojo para "Inactivo"
    }
  }};
`;
