import React, {useState} from "react";
import styled from "styled-components";
import LineLogin from "./LineLoginButton";

const LineRegister = () => {
  return <NoDisplay>
    <LineLogin/>
  </NoDisplay>
};

const NoDisplay = styled.div`
  display: none;
`;

export default LineRegister;
