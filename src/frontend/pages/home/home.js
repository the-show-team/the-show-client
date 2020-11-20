import React from "react";
import {FormattedMessage} from "react-intl";
import styled from "styled-components";
import BasicLayout from "../../components/layout/BasicLayout";
import {RegisterButton} from "./RegisterButton";
import {LoginButton} from "./LoginButton";


const Home = () => {
  return <BasicLayout>
    <div className="ui container">
      <SubTitle>
        <FormattedMessage id="home.subTitle"/>
      </SubTitle>
      <Centered>
        <ButtonsContainer>
          <RegisterButton/>
          <Margin/>
          <LoginButton/>
        </ButtonsContainer>
        <About>
          <h2 className="ui header"><FormattedMessage id="home.about"/></h2>
          <SnsImage src="/images/home/sns.png"/>
          <div>
            <FormattedMessage id="home.description1"/><br/><br/>
            <FormattedMessage id="home.description2"/>
          </div>
        </About>
        <ButtonsContainer>
          <RegisterButton/>
        </ButtonsContainer>
      </Centered>
    </div>
  </BasicLayout>
};

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
const SubTitle = styled.div`
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  margin-top: 6vh;
`;
const ButtonsContainer = styled.div`
  margin: 3vh 0 6vh 0;
  display: flex;
  justify-content: center;
`;
const About = styled.div`
  margin-top: 9vh;
`;
const SnsImage = styled.img`
`;
const Margin = styled.div`
  margin-right: 3vw;
`;

export default Home;
