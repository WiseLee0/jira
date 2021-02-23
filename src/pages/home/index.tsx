import styled from "@emotion/styled";
import { ProjectPage } from "pages/project";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { HomeContainer } from "./container";
import { HomeHeader } from "./header"

export const HomePage = () => {
  return <Container>
    <HomeHeader></HomeHeader>
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<HomeContainer />} />
        <Route path="/projects/:projectId/*" element={<ProjectPage />} />
        <Navigate to='/projects'></Navigate>
      </Routes>
    </BrowserRouter>
  </Container>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
