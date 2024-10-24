import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TableComponent } from "../components/TableComponent";
import { EditarProductoForm } from "../components/forms/DashboardForms/Productos/EditarProductoForm";
import { AgregarUsuarioForm } from "../components/forms/DashboardForms/Users/AgregarUsuarioForm";
import { Paginado } from "../components/Paginado";
import styled from "styled-components";
import { GetUsuarios } from "../services/Users/GetUsuarios";
import { EditarUsuarioForm } from "../components/forms/DashboardForms/Users/EditarUsuarioForm"
import LoadingSpinner from "../components/LoadingSpinner";
import { NotificationComponent } from "../components/NotificationComponent";

export const UserManagementPage = () => {
  const pageRef = useRef(null);
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(8); // Número de usuarios por página
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // Estado para controlar la visibilidad de la notificación
  const [notificationMessage, setNotificationMessage] = useState(""); // Mensaje de la notificación

  // Efecto combinado para animación y carga de usuarios
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );

    const cargarUsuarios = async () => {
      try {
        setLoading(true);
        const { data, total } = await GetUsuarios();

        // Ordenar los usuarios por ID de manera descendente si no está en el orden adecuado
        const sortedData = data.sort((a, b) => b.id - a.id);

        setUsuarios(sortedData);
        setTotalPages(Math.ceil(total / itemsPerPage)); // Calcula el total de páginas basándose en los usuarios reales

      } catch (err) {
        setError("Hubo un error al cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, [itemsPerPage]);

  // Cambiar el número de elementos por página según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(4); // Modo responsive: 4 elementos por página
      } else {
        setItemsPerPage(8); // Modo normal: 8 elementos por página
      }
    };

    handleResize(); // Ejecutar al inicio
    window.addEventListener('resize', handleResize); // Agregar listener para el cambio de tamaño
    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el listener
    };
  }, []);

  // Función para agregar el nuevo usuario a la lista existente
  const handleAddUser = (newUser) => {
    setUsuarios(prevUsuarios => [newUser, ...prevUsuarios]);
    
    // Mostrar la notificación al crear el usuario
    showNotificationWithMessage("Creado correctamente");
  };

  const titles = ["Imagen", "Usuario", "Nombre", "Correo", "Estado", "Acción"];

  const openAgregarModal = () => setShowAgregarModal(true);
  const closeAgregarModal = () => setShowAgregarModal(false);

  const openEditarModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEditarModal(true);
  };

  const closeEditarModal = () => setShowEditarModal(false);

  // Función para actualizar el usuario en la lista existente
  const handleEditUser = (updatedUser) => {
    setUsuarios(prevUsuarios =>
      prevUsuarios.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );

    // Mostrar la notificación después de editar el usuario
    showNotificationWithMessage("Editado correctamente");
  };

  // Función para mostrar la notificación con un mensaje personalizado
  const showNotificationWithMessage = (message) => {
    setShowNotification(false); // Resetear primero la visibilidad
    setNotificationMessage(message); // Establecer el nuevo mensaje
    setTimeout(() => {
      setShowNotification(true); // Luego volver a mostrarla
    }, 100); // Usamos un pequeño retardo para reiniciar el estado de la notificación
  };

  return (
    <MainContainer ref={pageRef}>
      <h1>Gestión de Usuarios</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={() => setCurrentPage(1)}>Reintentar</button>
        </div>
      ) : (
        <>
          <TableComponent titles={titles} elements={usuarios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} onEdit={openEditarModal} />
          {/* Muestra el paginado si hay más de una página */}
          {totalPages > 1 && (
            <Paginado
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage} // Cambia la página actual
            />
          )}
        </>
      )}

      <FloatingButton onClick={openAgregarModal}>+</FloatingButton>

      <AgregarUsuarioForm showModal={showAgregarModal} closeModal={closeAgregarModal} onAddUser={handleAddUser} />

      {usuarioSeleccionado && (
        <EditarUsuarioForm
          showModal={showEditarModal}
          closeModal={closeEditarModal}
          usuario={usuarioSeleccionado}
          onEditUser={handleEditUser} // Pasamos la función de actualización
        />
      )}

      {/* Mostrar la notificación si está activa */}
      {showNotification && (
        <NotificationComponent
          backgroundColor="#4CAF50" // Color de fondo (verde para éxito)
          textColor="#fff" // Color del texto
          title={notificationMessage} // Mensaje dinámico
        />
      )}
    </MainContainer>
  );
};

// Estilos
const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
