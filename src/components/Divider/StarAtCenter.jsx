import styled from "styled-components";
import React from "react";

const Dividers = styled.div`
  margin: 64px auto;
  width: 90%;
  max-width: 100%;
  position: relative;
`;

const Divider = styled.div`
  height: 20px;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    margin: -25px auto 0;
    height: 25px;
    border-radius: 125px/12px;
    box-shadow: 0 0 10px #4fb39c;
  }
`;

const CenterCircle = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  margin-left: -25px;
  margin-bottom: -25px;
  box-shadow: 0 4px 10px #4fb39c;
  background-color: white;
  left: 50%;
`;

const InnerIcon = styled.i`
  position: absolute;
  inset: 4px;
  border: 1px dashed #4fb39c;
  border-radius: 100%;
  text-align: center;
  line-height: 40px;
  font-style: normal;
  color: #049372;
`;

export const StarAtCenter = () => {
  return (
    <Dividers>
      <Divider>
        <CenterCircle>
          <InnerIcon>&#10038;</InnerIcon>
        </CenterCircle>
      </Divider>
    </Dividers>
  );
};
