
import { CTAButton, Hspace, Subtitle } from "../components/CustomComponents";
import UserThought from "../components/UserThought";
import styled, { keyframes } from "styled-components";
import "../css/home.css"
import CTACard from "../components/CTACard";
import FeatureCards from "../components/FeatureCard";
import Container from "../components/Container";
import useHomeHook from "../components/helper/hooks/scrollToTopHook";
import { useGetStarted } from "../components/helper/hooks/useGetStartedHook";





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

const TopSection = styled.section`
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
    useHomeHook()
    return (
        <Container>

            <div className="m-auto">
                <Hspace height="200px" />
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
                        <CTAButton onClick={useGetStarted()}>
                            Get Started
                        </CTAButton>
                    </div>
                </TopSection>
                {/* features of cv builder */}
                <FeatureCards />
                {/* user thought  to this site */}
                <UserThought />

                <CTACard onClick={useGetStarted()} />


            </div>
        </Container>
    )
}
export default Home