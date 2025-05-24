// components/Loading.js
import styled, { keyframes } from "styled-components";
import { Hspace } from "./CustomComponents";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const Wrapper=styled.div`
min-height:100vh;
display:flex;
flex-direction:column;
width:100vw;
font-family:'Roboto',Sans serif;
`

export const Loader = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.border || "#ccc"};
  border-top: 4px solid ${({ theme }) => theme.colors.accent || "#007BFF"};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
  margin: 30px auto;
`;

const LoadingText = styled.div`
  text-align: center;
  margin-top: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

const Loading = ({ message = "Loading..." }) => (
  <Wrapper>
    <Hspace height="250px"/>
    <Loader />
    <LoadingText>{message}</LoadingText>
  </Wrapper>
);

export default Loading;
