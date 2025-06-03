import { memo } from "react";
import { FlexBox } from "../../CustomComponents";
import styled from "styled-components";
import capitalize from "../../../helper/capitalize";
import { getProficiencyPercent } from "../../../helper/helper";

// Styled Components
const LanguageWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ProgressBarContainer = styled.div.withConfig({
  shouldForwardProp:(props)=>!['borderRadius',"backgroundColor"].includes(props)
})`
  background: ${({ backgroundColor }) => backgroundColor || "#eee"};
  border-radius: ${({ borderRadius }) => borderRadius || "10px"};
  overflow: hidden;
  height: ${({ height }) => height || "8px"};
  margin-top: 4px;
`;

const ProgressBar = styled.div.withConfig({
  shouldForwardProp:(props)=>!['percent'].includes(props)
})`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: ${({ color }) => color || "#4caf50"};
  transition: width 0.3s ease;
`;


// Component
const LanguageCard = ({ language, layout_no, style = {}, ...props }) => {
  const percent = getProficiencyPercent(language.proficiency);
  const { side, shouldIncludeProficiency } = props;
  const barStyle = style?.progressBar || {};

  return (
    <LanguageWrapper>
      <FlexBox justifyContent="space-between">
        <h2
          style={{
            ...style?.sectionSubHeader,
            ...(side === "right" && { color: "white" }),
          }}
        >
          {capitalize(language.language)}
        </h2>
        {shouldIncludeProficiency && (
          <h2
            style={{
              ...style?.sectionSubHeader,
              ...(side === "right" && { color: "white" }),
            }}
          >
            {language.proficiency}
          </h2>
        )}
      </FlexBox>
      <ProgressBarContainer
        backgroundColor={barStyle.backgroundColor}
        height={barStyle.height}
        borderRadius={barStyle.borderRadius}
      >
        <ProgressBar
          percent={percent}
          color={barStyle.fillColor}
        />
      </ProgressBarContainer>
    </LanguageWrapper>
  );
};

export default memo(LanguageCard);
