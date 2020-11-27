import React from "react";
import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const BasicLayout = ({children}) => (
  <Container>
    <Header/>
    {children}
    <FooterMargin/>
    <Footer/>
  </Container>
);
const Container = styled.div`
  width: 100vw;
  overflow: hidden;
  min-height: 100vh;
  position: relative;
`;

const FooterMargin = styled.div`
  margin-bottom: 10vh;
`;

export default BasicLayout;
