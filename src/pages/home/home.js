import React from "react";
import {FormattedMessage} from "react-intl";
import styled from "styled-components";


const Home = () => {
  return <div>
    <div className="ui container">
      <Centered>
        <div className="ui centered">
          <a href="/register">
            <button className="ui primary massive button"><FormattedMessage id="home.register"/></button>
          </a>
          <a href="/search">
            <button className="ui primary massive button"><FormattedMessage id="home.search"/></button>
          </a>
          <a href="/login">
            <button className="ui primary massive button"><FormattedMessage id="home.login"/></button>
          </a>
          <a href="/others">
            <button className="ui secondary massive button"><FormattedMessage id="home.others"/></button>
          </a>
        </div>
      </Centered>
    </div>
  </div>
};

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:100vh
`;

export default Home;
