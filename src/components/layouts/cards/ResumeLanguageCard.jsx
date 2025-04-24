import { memo } from "react"
import { FlexBox,  } from "../../CustomComponents"
import { H3 } from "../../elements/resumeSectionWrapper"
import styled from "styled-components";

const LanguageWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ProgressBarContainer = styled.div`
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
  height: 8px;
  margin-top: 4px;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: #4caf50;
  transition: width 0.3s ease;
`;

const getProficiencyPercent = (level) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return 25;
    case "intermediate":
      return 50;
    case "proficient":
      return 75;
    case "native":
    case "fluent":
      return 100;
    default:
      return 0;
  }
};





const LanguageCard = ({ language }) => {
    const percent = getProficiencyPercent(language.proficiency);
    return (
      <LanguageWrapper>
        <H3 textAlign="left" color="white">{language.language}</H3>
        <ProgressBarContainer>
          <ProgressBar percent={percent} />
        </ProgressBarContainer>
      </LanguageWrapper>
    );
  };
export default LanguageCard