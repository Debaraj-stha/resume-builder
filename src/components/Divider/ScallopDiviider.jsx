import React from "react";
import styled from "styled-components";

// Scallop pointing up (like a hill)
// Create a radial gradient circle centered at the top (50% horizontally, 0% vertically)
// Fill green from 0px to ~19.5px, then transition to white starting at 20px

const ScallopUp = styled.div`
  width: 100%;
  height: 100px;
  background: radial-gradient(
    circle at 50% 0,
    #369A7E 10px,
    #369A7E 19.5px,
    white 20px
  );
  background-size: 49px 100%;
  background-repeat: repeat-x;
`;

// Scallop pointing down (like a dip)
//here center is bottom i.e 100%
//backgroun size specifies 49px width of circle and 100% height of the element
const ScallopDown = styled.div`
  width: 100%;
  height: 100px;
  background: radial-gradient(
    circle at 50% 100%,
    #369A7E 10px,
    #369A7E 19.5px,
    white 20px
  );
  background-size: 49px 100%;
  background-repeat: repeat-x;
`;

const ColorBlock = styled.div`
  background: #369A7E;
  padding: 4rem;
  color: white;
`;

export const ScallopUpDivider = () => {
  return (
    <div>
      <ScallopUp />
      <ColorBlock>
        <p>This is a green block after the scallop-up divider.</p>
      </ColorBlock>
    </div>
  );
};

export const ScallopDownDivider = () => {
  return (
    <div>
      <ColorBlock>
        <p>This is a green block before the scallop-down divider.</p>
      </ColorBlock>
      <ScallopDown />
    </div>
  );
};
