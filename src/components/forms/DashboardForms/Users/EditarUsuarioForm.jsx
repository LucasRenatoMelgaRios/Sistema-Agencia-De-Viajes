import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import ReactDOM from "react-dom";

export const EditarUsuarioForm = ({ showModal, closeModal, usuario, onEditUser }) => {
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    nombre: '',
    correo: '',
    activo: '',
    imagen: ''
  });

  // Prellenar el formulario con los datos del usuario seleccionado al abrir el modal
  useEffect(() => {
    if (usuario) {
      setFormData({
        usuario: usuario.usuario || '',
        password: usuario.password || '',
        nombre: usuario.nombre || '',
        correo: usuario.correo || '',
        activo: usuario.activo || false, // Suponiendo que sea un booleano
        imagen: usuario.imagen || ''
      });
    }
  }, [usuario]);

  useEffect(() => {
    if (showModal) {
      gsap.set([modalRef.current, overlayRef.current], { visibility: 'visible' });

      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: 'power3.out' },
      });

      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1 })
        .fromTo(modalRef.current, { y: -50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1 }, '-=0.2')
        .fromTo(formRef.current?.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, '-=0.2');
    } else {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: 'power2.in' },
        onComplete: () => {
          gsap.set([modalRef.current, overlayRef.current], { visibility: 'hidden' });
        }
      });

      tl.to(modalRef.current, { y: -30, opacity: 0, scale: 0.95 }).to(overlayRef.current, { opacity: 0 }, '-=0.2');
    }
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://67194f637fc4c5ff8f4d2969.mockapi.io/viajes/usuarios/${usuario.id}`,
        formData
      );
      console.log('Usuario actualizado:', response.data);

      // Llamamos a la función onEditUser para actualizar el usuario en la tabla sin recargar la página
      onEditUser(response.data);

      closeModal(); // Cerramos el modal después de la actualización
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return ReactDOM.createPortal(
    <>
      <Overlay ref={overlayRef} onClick={closeModal} $show={showModal} />
      <ModalContainer ref={modalRef} $show={showModal}>
        <FormContainer ref={formRef} onSubmit={handleSubmit}>
          <Title>Editar Usuario</Title>

          <FormGroup>
            <Label>Nombre del Usuario</Label>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Juan Pérez"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Usuario</Label>
            <Input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              placeholder="Ej: juanperez123"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Correo Electrónico</Label>
            <Input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="Ej: juanperez@ejemplo.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Estado</Label>
            <Select name="activo" value={formData.activo} onChange={handleInputChange} required>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>URL de la Imagen</Label>
            <Input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleInputChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={closeModal}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit">Guardar Cambios</SubmitButton>
          </ButtonGroup>
        </FormContainer>
      </ModalContainer>
    </>,
    document.getElementById('modal-root') // Renderizamos el contenido del modal en el "modal-root"
  );
};

// Usamos los mismos estilos que en el formulario de "Agregar Usuario"
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  visibility: hidden;
  width: 90%;
  max-width: 500px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
`;

const SubmitButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border: none;

  &:hover {
    background-color: #2563eb;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: #4b5563;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export default EditarUsuarioForm;
