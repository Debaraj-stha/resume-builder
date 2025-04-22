import React from 'react'
import AnimateNumber from './NumberAnimation'
import styled from 'styled-components'
const CounterWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  background-color: ${({ theme }) => theme.colors.card.background};
  color: ${({ theme }) => theme.colors.card.text};
  border-radius: 16px;
  box-shadow: 0 8px 20px ${({ theme }) => theme.colors.card.shadow};
  transition: all 0.3s ease;
  margin-top: 20px;

  p {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (min-width: 601px) {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    border: none;
    padding: 4rem 1.5rem;
    text-align: center;
    p {
      font-size: 1rem;
    }
  }
`;



export default function NumberOfResumeCreation() {
  return (
    <CounterWrapper>
      <AnimateNumber target={100} duration={2000} />
      <p>Resumes Created</p>
    </CounterWrapper>
  )
}

