
import { CTAButton, Hspace, Subtitle } from "../components/CustomComponents";
import UserThought from "../components/UserThought";
import styled, { keyframes } from "styled-components";
import "../css/home.css"
import CTACard from "../components/CTACard";
import FeatureCards from "../components/FeatureCard";
import Container from "../components/Container";
import useHomeHook from "../helper/hooks/scrollToTopHook";
import { useGetStarted } from "../helper/hooks/useGetStartedHook";
import UploadResumeCardAndIcon from "../components/UploadResumeCardAndIcon";
import LayoutsModal from "../components/LayoutsModal";



const TypingAnimation = keyframes`
  from {
    max-width: 0;
  }
  to {
    max-width: 100%;
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
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  max-width: 0;
  animation: ${TypingAnimation} 2s steps(30) 1s forwards;
`;


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
          <div className="max-w-5xl mx-auto text-center">
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
        <UploadResumeCardAndIcon />
      <LayoutsModal/>
      
      </div>
   
    </Container>
  )
}
export default Home