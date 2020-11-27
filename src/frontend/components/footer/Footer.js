import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <Container>
    <CopyRight>Copyright ©CHANT-THROUGH Ltd. All Right Reserved.</CopyRight>
  </Container>
};

const Container = styled.div`
    background-color: #565554;
    width: 100vw;
    height: 10vh;
    display: grid;
    place-content: center;
    position:absolute;
    bottom:0;
`;

const CopyRight = styled.span`
  font-size: 0.9rem;
  color: white;
`;

export default Footer;
