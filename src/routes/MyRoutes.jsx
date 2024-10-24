import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import styled from "styled-components";
import { SideBar } from "../components/SideBar";
import { UserManagementPage } from "../pages/UserManagementPage";

export const MyRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <AppContainer> 
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <ContentRoutes isOpen={isSidebarOpen}>
          <Routes>
            <Route path="/" element={<UserManagementPage />} />
            {/* <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/empresa" element={<EmpresaPage />} />
            <Route path="/inventario" element={<InventarioPage />} />
            <Route path="/configuraciones" element={<ConfiguracionesPage />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ContentRoutes>
      </AppContainer>
    </BrowserRouter>
  );
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentRoutes = styled.div`
  flex: 1;
  margin-left: ${(props) => (props.isOpen ? "250px" : "90px")};
  padding: 0px 20px;
  transition: margin-left 0.3s ease-in-out;
  background-color: rgba(245, 246, 250, 1);
`;

export default MyRoutes;