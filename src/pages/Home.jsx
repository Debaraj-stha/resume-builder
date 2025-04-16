import React, { useEffect } from "react";
import { CTA, CTAButton, Heading, Hspace, Subtitle } from "../components/CustomComponents";
import Feature from "../components/Features";
import UserThought from "../components/UserThought";
import styled, { keyframes, useTheme } from "styled-components";
import "../css/home.css"
import CTACard from "../components/CTACard";
import FeatureCards from "../components/FeatureCard";

const TypingAnimation = keyframes`
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
`
const TextWrapper = styled.div`
  color: ${({ theme }) => theme.colors.accent || "black"};
  font-weight: 800;
  font-size: 45px;
  letter-spacing: 3px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height:max-content;
`;

const Span = styled.span`
    width:0;
    display:inline-block;
    overflow:hidden;
    word-wrap:nowrap;
    height:100%;
    animation: ${TypingAnimation} 2s steps(30) 1s  forwards;
`

const TopSection=styled.section`
    background-color: ${({ theme }) => theme.colors.card.background};
  color: ${({ theme }) => theme.colors.card.text};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors.card.shadow};
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }) => theme.colors.card.hoverBackground};
  }
`

const Home = () => {
    useEffect(() => {
        const sections = document.querySelectorAll("section");

        const handleScroll = () => {
            sections.forEach((section) => {
                const boundingRect = section.getBoundingClientRect().top;
                if (boundingRect < window.innerHeight - 100) {
                    section.classList.add("animate");
                }
            });
        };

        handleScroll(); // run once on mount
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getStarted = () => {

    }
    const createCv = () => {

    }
    const theme=useTheme()
    return (

        <div className="m-auto">
            <Hspace />
            <TopSection>
                <div className="max-w-4xl mx-auto text-center">
                    <TextWrapper>
                        <Span>
                            Build Your Professional CV in Minutes
                        </Span>
                    </TextWrapper>
                    <Subtitle>
                        Easy to use, customizable templates. Download your resume instantly.
                    </Subtitle>
                    <CTAButton onClick={getStarted}>
                        Get Started
                    </CTAButton>
                </div>
            </TopSection>
            {/* features of cv builder */}
            <FeatureCards />
            {/* user thought  to this site */}
            <UserThought />

            <CTACard />

        </div>
    )
}
export default Home