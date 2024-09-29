import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { UserManagementPage } from "../pages/UserManagementPage";
import { ClientRegistrationPage } from "../pages/ClientRegistrationPage";
import { DepositEntryPage } from "../pages/DepositEntryPage";
import { ReservationManagementPage } from "../pages/ReservationManagementPage";
import { SalesReportPage } from "../pages/SalesReportPage";
import { SettingsPage } from "../pages/SettingsPage";
import { TourPackagesPage } from "../pages/TourPackagesPage";
import { SideBar } from "../components/SideBar";
import styled from "styled-components";

export const MyRoutes = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <BrowserRouter>
            <AppContainer>
                <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <ContentContainer isOpen={isSidebarOpen}>
                    <Routes>
                        <Route path="/" element={<UserManagementPage />} />
                        <Route path="/client-registration" element={<ClientRegistrationPage />} />
                        <Route path="/deposits" element={<DepositEntryPage />} />
                        <Route path="/reservation-management" element={<ReservationManagementPage />} />
                        <Route path="/sales-report" element={<SalesReportPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/tour-packages" element={<TourPackagesPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ContentContainer>
            </AppContainer>
        </BrowserRouter>
    );
};

const AppContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const ContentContainer = styled.div`
    flex: 1;
    margin-left: ${(props) => (props.isOpen ? "300px" : "120px")};
    padding: 20px;
    transition: margin-left 0.3s ease-in-out;
`;

export default MyRoutes;
