import TwitterLogin from "react-twitter-login";
import React from "react";
import styled from "styled-components";

const TwitterRegister = () => {
  return <NoDisplay>
    <TwitterLogin
    />
  </NoDisplay>
};

const NoDisplay = styled.div`
  display: none;
`;

export default TwitterRegister;
