import React from 'react';
import styled from 'styled-components';
import { Hspace } from "../components/CustomComponents";

import CTACard from '../components/CTACard';
import FeatureCards from '../components/FeatureCard';
import MissionVisionCard from '../components/MissionVisionCard';
import Teamscard from '../components/TeamsCard';
import IntroCard from '../components/IntroCard';
import Container from '../components/Container';


const Wrapper = styled.section`
  font-family: 'Poppins', sans-serif;
  color: ${({ theme }) => theme.colors.card.text};
`;



const About = () => {
    return (
      <Container>
          <Wrapper>
            <Hspace />
            <IntroCard />
            <MissionVisionCard />
            <FeatureCards />
            <Teamscard />
            <CTACard />
        </Wrapper>
      </Container>
    );
};

export default About;
