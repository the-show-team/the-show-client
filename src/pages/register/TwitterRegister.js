import TwitterLogin from "react-twitter-login";
import React from "react";
import styled from "styled-components";

const TwitterRegister = () => {
  const responseTwitter = (error, response) => {
    console.log("after:", response)
  };
  return <NoDisplay>
    <TwitterLogin
    />
  </NoDisplay>
};

const NoDisplay = styled.div`
  display: none;
`;

export default TwitterRegister;
