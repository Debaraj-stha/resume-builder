import React from "react";
import styled from "styled-components";
const ContainerDiv=styled.div`
width:100vw;
`
const Container = ({ children }) => {
  return (
    <ContainerDiv className="px-4 sm:px-6 lg:px-78 min-h-screen">
      {children}
    </ContainerDiv>
  );
};

export default Container;
