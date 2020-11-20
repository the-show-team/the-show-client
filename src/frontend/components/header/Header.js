import React from "react";
import styled from "styled-components";
import mediaQuery from "styled-media-query";
import LanguageSelector from "./languageSelector";
import {Link} from "react-router-dom";


const Header = () => {
  return <div>
    <Container>
      <Link to="/"><Banner src="/images/banner/title-banner.png"/></Link>
      <Menu>
        <LanguageSelector/>
      </Menu>
    </Container>
  </div>
};

const mediaMobile = mediaQuery.lessThan("medium");


const Container = styled.div`
    width: 100vw;
    height: 16vh;
    ${mediaMobile`height: 10vh;`}
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Banner = styled.img`
  width: 40vw;
  ${mediaMobile`width: 50vw;`}
`;
const Menu = styled.div`
  display: flex;
  justify-content : flex-end;
  align-items: baseline;
  width: 30vw;
  font-size: 1.8rem;
  ${mediaMobile`font-size: 0.9rem;`}
  ${mediaMobile`width: 60vw;`}
  font-family: Roboto;
  margin-right: 2vw;
`;

export default Header
