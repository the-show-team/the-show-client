import {FormattedMessage} from "react-intl";
import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const LoginButton = () => {
  return <Link to="/login">
    <Button className="ui rounded massive button"><FormattedMessage id="home.login"/></Button>
  </Link>
};
const Button = styled.button`
  background: #EB932C !important;
  border-radius: 15px !important;
  color: white !important;
  white-space: nowrap;
`;
