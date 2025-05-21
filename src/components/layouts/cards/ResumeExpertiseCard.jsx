import styled from "styled-components";
import capitalize from "../../../helper/capitalize";


const ExpertiseWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

export const RangeInput = styled.input.attrs({ type: "range" }).withConfig({
  shouldForwardProp:(props)=>!["borderRadius","thumbSize","thumbColor","thumbRadius","thumbBorderColor"].includes(props)
})`
  width: 100%;
  appearance: none;
  height: ${({ height }) => height || "6px"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  background: linear-gradient(
    to right,
    ${({ color }) => color || "#4caf50"} 0%,
    ${({ color }) => color || "#4caf50"} ${({ value }) => value}%,
    #ccc ${({ value }) => value}%,
    #ccc 100%
  );
  outline: none;
  transition: background 450ms ease-in;

  &::-webkit-slider-thumb {
    appearance: none;
    width: ${({ thumbSize }) => thumbSize || "14px"};
    height: ${({ thumbSize }) => thumbSize || "14px"};
    background: ${({ thumbColor }) => thumbColor || "#fff"};
    border: 2px solid ${({ thumbBorderColor }) => thumbBorderColor || "#4caf50"};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: ${({ thumbSize }) => thumbSize || "14px"};
    height: ${({ thumbSize }) => thumbSize || "14px"};
    background: ${({ thumbColor }) => thumbColor || "#fff"};
    border: 2px solid ${({ thumbBorderColor }) => thumbBorderColor || "#4caf50"};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const ExpertiseCard = ({ expertise, style = {} }) => {
  const handleChange = (e) => {
    // optional: handle range value update if needed
  };

  const barStyle = style?.barStyle || {};

  return (
    <ExpertiseWrapper>
      <h2 style={{ ...style.sectionSubHeader }}>{ capitalize(expertise.tech)}</h2>
      <RangeInput
        value={expertise.value}
        onChange={handleChange}
        color={barStyle.fillColor}
        height={barStyle.height}
        borderRadius={barStyle.borderRadius}
        thumbColor={barStyle.thumbColor}
        thumbBorderColor={barStyle.thumbBorderColor}
        thumbSize={barStyle.thumbSize}
      />
    </ExpertiseWrapper>
  );
};

export default ExpertiseCard;
