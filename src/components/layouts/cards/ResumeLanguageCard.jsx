import { memo } from "react"
import { FlexBox,  } from "../../CustomComponents"
import { H2, H3 } from "../../elements/resumeSectionWrapper"
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
  background: ${({color})=>color||"#4caf50"};
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





const LanguageCard = ({ language,layout_no,style }) => {
    const percent = getProficiencyPercent(language.proficiency);
    switch(layout_no){
      case 3:
        return(
          <LanguageWrapper>
            <H2 fontFamily="'Roboto', sans-serif" color="#0f0771" textAlign="left" fontWeight="normal" fontSize="18px" >{language.language}</H2>
            <ProgressBarContainer>
              <ProgressBar percent={percent} color="#0f0771"/>
            </ProgressBarContainer>
          </LanguageWrapper>
        )
        
      default:
        return (
          <LanguageWrapper>
            <h2 style={{...style.h2}}>{language.language}</h2>
            <ProgressBarContainer>
              <ProgressBar percent={percent} color={style.color} />
            </ProgressBarContainer>
          </LanguageWrapper>
        );
    }
  
  };
export default LanguageCard