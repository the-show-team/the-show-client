import React from "react";
import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const BasicLayout = ({children}) => (
  <Container>
    <Header/>
    {children}
    <Footer/>
  </Container>
);
const Container = styled.div`
  width: 100vw;
  overflow: hidden;
`;

export default BasicLayout;
