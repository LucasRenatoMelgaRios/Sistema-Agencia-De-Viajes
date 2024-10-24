import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import ReactDOM from "react-dom";
import axios from 'axios';

export const AgregarUsuarioForm = ({ showModal, closeModal, onAddUser }) => {
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    nombre: '',
    correo: '',
    activo: '', // Estado por defecto
    imagen: '' // Aquí se colocará la URL de la imagen
  });

  useEffect(() => {
    if (showModal) {
      // Reset visibility
      gsap.set([modalRef.current, overlayRef.current], { visibility: 'visible' });

      // Create timeline for entrance animation
      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: 'power3.out' },
      });

      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1 }
      )
        .fromTo(modalRef.current,
          {
            y: -50,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
          },
          '-=0.2'
        )
        .fromTo(formRef.current?.children,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1
          },
          '-=0.2'
        );
    } else {
      // Exit animation
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: 'power2.in' },
        onComplete: () => {
          gsap.set([modalRef.current, overlayRef.current], { visibility: 'hidden' });
        }
      });

      tl.to(modalRef.current, {
        y: -30,
        opacity: 0,
        scale: 0.95,
      })
        .to(overlayRef.current, {
          opacity: 0
        }, '-=0.2');
    }
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://67194f637fc4c5ff8f4d2969.mockapi.io/viajes/usuarios', formData);
      console.log('Usuario agregado:', response.data);

      // Llama a la función onAddUser para agregar el nuevo usuario a la tabla
      onAddUser(response.data);

      closeModal(); // Cerrar el modal
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  return ReactDOM.createPortal(
    <>
      <Overlay ref={overlayRef} onClick={closeModal} $show={showModal} />
      <ModalContainer ref={modalRef} $show={showModal}>
        <FormContainer ref={formRef} onSubmit={handleSubmit}>
          <Title>Agregar Nuevo Usuario</Title>

          <FormGroup>
            <Label>Usuario</Label>
            <Input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              placeholder="Ej: Neha_Stroman"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Ingresa una contraseña"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Monica Greenholt"
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
              placeholder="Ej: Lyla16@hotmail.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Estado</Label>
            <Select
              name="activo"
              value={formData.activo}
              onChange={handleInputChange}
              required // Aseguramos que el usuario seleccione un estado
            >
              <option value="" disabled>Selecciona un estado</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>URL de Imagen</Label>
            <Input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleInputChange}
              placeholder="Ej: https://example.com/image.jpg"
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={closeModal}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit">
              Agregar Usuario
            </SubmitButton>
          </ButtonGroup>
        </FormContainer>
      </ModalContainer>
    </>,
    document.getElementById('modal-root') // Renderizamos el contenido del modal en el "modal-root"
  );
};
// Estilos para el modal y el formulario
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

const InputsImagesContainer = styled.div`
  display: flex;
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

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const Select = styled.select`
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

export default AgregarUsuarioForm;
