// Resume.jsx
import React from 'react';
import styled from 'styled-components';
import { FlexResumeWrapper } from '../../elements/resumeWrapper';

const ResumeWrapper = styled.div`
  display: flex;
  max-width: 900px;
  margin: 40px auto;
  border: 1px solid #ccc;
  font-family: 'Segoe UI', sans-serif;
`;

const LeftColumn = styled.div`
  flex: 2;
  padding: 40px;
  background-color: #fff;
`;

const RightColumn = styled.div`
  flex: 1;
  background-color: #1c2a45;
  color: #fff;
  padding: 40px 30px;
`;

const Name = styled.h1`
  color: #1c2a45;
  margin: 0;
`;

const Title = styled.h2`
  font-size: 16px;
  color: #3086d6;
  margin: 5px 0 20px;
`;

const Contact = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #3086d6;
  margin-bottom: 10px;
`;

const JobBlock = styled.div`
  margin-bottom: 20px;
`;

const JobTitle = styled.div`
  font-weight: bold;
  color: #1c2a45;
`;

const Company = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Description = styled.ul`
  font-size: 14px;
  margin: 10px 0;
  padding-left: 20px;
  color: #333;
`;

const SidebarSection = styled.div`
  margin-bottom: 30px;
`;

const SidebarItem = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;

const ProgressBar = styled.div`
  background: #ccc;
  height: 6px;
  border-radius: 3px;
  margin: 6px 0 16px;
`;

const Progress = styled.div`
  height: 100%;
  background: #3086d6;
  width: ${props => props.percent || 0}%;
  border-radius: 3px;
`;

const Resume = () => (
    <div className='mx-2 w-full max-w-full'>
  <FlexResumeWrapper>
    <LeftColumn>
      <Name>SEBASTIAN HURST</Name>
      <Title>Business Data Analyst</Title>
      <Contact>
        📞 +xxx-375-8132 • 📧 name@gmail.com • 📍 Raleigh-Durham, NC
      </Contact>

      <SectionTitle>EXPERIENCE</SectionTitle>

      <JobBlock>
        <JobTitle>Advanced Services Data Analyst Intern</JobTitle>
        <Company>Harvey – Raleigh-Durham, NC (2018–Present)</Company>
        <Description>
          <li>Saved the company $900,000+ yearly in short storage costs</li>
          <li>Created financial dashboard using Tableau</li>
        </Description>
      </JobBlock>

      <JobBlock>
        <JobTitle>Junior Data Analyst</JobTitle>
        <Company>Reilly Group – Raleigh-Durham, NC (2015–2018)</Company>
        <Description>
          <li>Cleaned data and migrated models from Excel to SSRS</li>
        </Description>
      </JobBlock>
    </LeftColumn>

    <RightColumn>
      <SidebarSection>
        <SectionTitle>EDUCATION</SectionTitle>
        <SidebarItem>BBA, International Business – Metropolia University of Applied Sciences</SidebarItem>
        <SidebarItem>Master – Economics des Entreprises et des Marchés – Paris 1 Panthéon-Sorbonne</SidebarItem>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>STRENGTHS</SectionTitle>
        <SidebarItem>✓ Stakeholder Engagement</SidebarItem>
        <SidebarItem>✓ Strategic Focus</SidebarItem>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>KEY ACHIEVEMENTS</SectionTitle>
        <SidebarItem>✓ Rescued $1.5mil in project funding</SidebarItem>
        <SidebarItem>✓ Launched Data Governance Framework</SidebarItem>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>INDUSTRY EXPERTISE</SectionTitle>
        <SidebarItem>Excel/VBA</SidebarItem>
        <ProgressBar><Progress percent={90} /></ProgressBar>
        <SidebarItem>SQL/Access</SidebarItem>
        <ProgressBar><Progress percent={85} /></ProgressBar>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>LANGUAGES</SectionTitle>
        <SidebarItem>English – Native</SidebarItem>
        <SidebarItem>French – Proficient</SidebarItem>
      </SidebarSection>
    </RightColumn>
  </FlexResumeWrapper>
  </div>
);

export default Resume;
