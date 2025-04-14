import React from "react";
import styled from "styled-components";

const Line = styled.div`
  width: 90%;
  max-width: 100%;
  height: 2px;
  position: relative;
  margin: 40px auto;
  text-align: center;
  bottom:0;
 

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: linear-gradient(to right, transparent, #2c3e50);
    
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, transparent, #2c3e50);
  }

  span {
    position: relative;
    padding: 0 16px;
    background: #fff;
    color: #444;
    font-weight: 500;
    font-size: 14px;
    top:-10px;
    
  }
`;

const TextAtCenter = ({ text }) => {
  return (
    <Line>
      <span>{text}</span>
    </Line>
  );
};

export default TextAtCenter;
