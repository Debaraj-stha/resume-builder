import styled from "styled-components";
import { H2, H3 } from "../../elements/resumeSectionWrapper";

const ExpertiseWrapper = styled.div`
// //   margin-bottom: 1rem;
// text-align:center;
`;



export const RangeInput = styled.input.attrs({ type: "range" })`
  width: 100%;
  appearance: none;
  height: 6px;
  border-radius: 5px;
  background: linear-gradient(to right, ${({color})=>color||"#4caf50"} 0%, ${({color})=>color||"#4caf50"} ${props => props.value}%, #ccc ${props => props.value}%, #ccc 100%);
  outline: none;
  transition: background 450ms ease-in;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: #fff;
    border: 2px solid ${({color})=>color||"#4caf50"};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: #fff;
    border: 2px solid ${({color})=>color||"#4caf50"};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const ExpertiseCard = ({ expertise, layout_no }) => {
    const handleCHange=(e)=>{

    }
  switch (layout_no) {
    case 1:
      return (
        <ExpertiseWrapper>
          <H3 textAlign="left" fontWeight="500">{expertise.tech}</H3>
          <RangeInput value={expertise.value} onChange={handleCHange}/>
        </ExpertiseWrapper>
      );
    default:
      return (
        <ExpertiseWrapper>
          <H2 color="#4bdd97" fontSize="16px" fontWeight="normal">{expertise.tech}</H2>
          <RangeInput value={expertise.value} onChange={handleCHange} color="#4bdd97"/>
        </ExpertiseWrapper>
      )
  }
};

export default ExpertiseCard;
