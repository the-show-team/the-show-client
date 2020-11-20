import React from "react";
import styled from "styled-components";
import mediaQuery from "styled-media-query";

export const Search = () => {
  return <div className="ui icon input">
    <Input className="prompt" type="text" placeholder="Search user..."/>
    <i className="search icon"/>
  </div>
};

const mediaMobile = mediaQuery.lessThan("medium");

const Input = styled.input`
  width: 30vw;
  ${mediaMobile`width: 90vw;`}
  height: 7vh;
`;
