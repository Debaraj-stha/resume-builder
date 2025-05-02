import React from "react";
import not_found from "../assets/not_found.svg";
import styled from "styled-components";
import Container from "../components/Container";
import { Hspace } from "../components/CustomComponents";

// Styled components
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 60%;
    max-width: 600px;
    height: auto;
    opacity: 0.9;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 768px) {
    img {
      width: 80%;
    }
  }
`;

const Wrapper = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  color:${({theme})=>theme.colors.text||"#333"};
  margin-bottom: 20px;
  @media(max-width: 768px){
  font-size:4rem;
  }
`;

const Subtitle = styled.p`
    font-size: 2rem;
    color:${({theme})=>theme.colors.text||"#666"};
    margin-bottom: 10px;
    @media(max-width: 768px){
    font-size:1.2rem;
    }
`;

const NotFound = () => {
  return (
    <Container>
        <Hspace/>
      <Wrapper>
        <Title>Page not Found :(</Title>
        <Subtitle>Looks like the page you're trying to reach doesn't exist.</Subtitle>
        <ImageContainer>
          <img src={not_found} alt="Page not found" loading="lazy" />
        </ImageContainer>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
