import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { SlPicture } from "react-icons/sl";


export const FileUpload = () => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  };

  return (
    <FileUploadContainer>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!selectedFile && (
        <FileButton onClick={onChooseFile}>
          <UploadIcon><SlPicture />
          </UploadIcon>
          <UploadText>Subir</UploadText>
        </FileButton>
      )}

      {selectedFile && (
        <>
          <FileCard>
            {/* Vista previa de la imagen o icono */}
            <FileInfo>
              {selectedFile.type.startsWith("image/") ? (
                <ImageContainer>
                 <PreviewImage src={URL.createObjectURL(selectedFile)} alt="preview" />

                </ImageContainer>
              ) : (
                <FileIcon>📄</FileIcon>
              )}
            </FileInfo>

            {/* Botón de cerrar */}
            <CloseButton onClick={clearFileInput}><MdClose color="#ffff"/></CloseButton>
          </FileCard>
        </>
      )}
    </FileUploadContainer>
  );
};

export default FileUpload;

// Styled Components

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const FileButton = styled.button`
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #0400ff;
  border-radius: 12px;
  background-color: #f9f9f9;
  width: clamp(8rem, 12vw, 9rem);

  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const UploadIcon = styled.span`
  font-size: 2rem;
  color: #4004e6;
`;

const UploadText = styled.span`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #7c4dff;
`;

const FileCard = styled.div`
  width: clamp(8rem, 12vw, 9rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(117, 96, 255, 0.5);
  border-radius: 12px;
  background-color: #fff;
  position: relative; /* Necesario para que el botón "X" se posicione dentro del contenedor */
  height: 120px; /* Aseguramos que el contenedor tenga suficiente altura para la imagen */
`;

const FileIcon = styled.span`
  font-size: 1.8rem;
  color: #7c4dff;
`;

const FileInfo = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const ImageContainer =styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PreviewImage = styled.img`
  width: 100%; /* Ocupará todo el ancho disponible */
  height: 100%; /* Ocupará todo el alto disponible */
  object-fit: cover; /* La imagen se ajustará sin distorsionarse */
  border-radius: 12px; /* Mismo radio de borde que el contenedor */

  `;

const CloseButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1em;
  background-color: red;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  
`;