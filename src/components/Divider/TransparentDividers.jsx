
import styled from "styled-components";
export const LineDivider=styled.div.withConfig({
  shouldForwardProp:(props)=>!["backgroundColor"].includes(props)
})`
background:${({backgroundColor})=>backgroundColor||"black"};
width:100%;
position:relative;
height:${({height})=>height||"2px"};
`
export const Line = styled.div.withConfig({shouldForwardProp:(props)=>!["backgroundColor"].includes(props)})`
width:100%;
max-width:100%;
position:relative;
background:linear-gradient(to right,transparent,${(props) => props.backgroundColor || "black"},${(props) => props.backgroundColor || "black"},transparent);
height:2px;
`
const Box = styled.div.withConfig({shouldForwardProp:(props)=>
  !["borderLeftColor","backgroundColor","borderTopColor","borderBottomColor","borderRightColor"].includes(props)})`
position:relative;
&::before{
content:"";
position:absolute;
background:${(props) => props.backgroundColor || "white"};
border-left:2px solid ${(props) => props.borderLeftColor || "black"};
border-top:2px solid ${(props) => props.borderTopColor || "black"};
border-bottom:2px solid ${(props) => props.borderBottomColor || "black"};
border-right:2px solid ${(props) => props.borderRightColor || "black"};
width:15px;
height:15px;
left:50%;

transform:translateX(-50%);
}
`

const BoxWithLeftRightBorder = styled(Box)`
top:-6px;
`
const BoxWithAngle = styled(Box)`
  &::before {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const DottedLine = styled(Line).withConfig({shouldForwardProp:(props)=>!["backgroundColor"].includes(props)})`
  background: repeating-linear-gradient(
    to right,
    ${(props) => props.backgroundColor} 0px,
    ${(props) => props.backgroundColor} 2px,
    transparent 2px,
    transparent 6px
  );
`;
const DashedLine = styled(Line).withConfig({shouldForwardProp:(props)=>!["backgroundColor"].includes(props)})`
  background: none;
  border-top: 2px dashed ${(props) => props.backgroundColor || "black"};
  height: 0;
`;


const DoubleLine = styled.div`
  height: 6px;
  position: relative;
  width: 100%;
  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    left:0;
    background: ${(props) => props.color || "black"};
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const Zigzag = styled.div`
  height: 10px;
  width: 100%;
  background: ${(props) => props.color || "black"};
  clip-path: polygon(
    0% 50%, 5% 0%, 10% 50%, 15% 0%, 20% 50%,
    25% 0%, 30% 50%, 35% 0%, 40% 50%, 45% 0%,
    50% 50%, 55% 0%, 60% 50%, 65% 0%, 70% 50%,
    75% 0%, 80% 50%, 85% 0%, 90% 50%, 95% 0%, 100% 50%
  );
`;


const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: ${(props) => props.color || "black"};
  border-radius: 50%;
`;




export const LineWithDots = () => (
  <div className="flex items-center gap-2">
    <Dot />
    <Line />
    <Dot />
  </div>
);




export const TransparentLine = () => {
  return <Line />
}
export const TransparentLineWithBox = () => {
  return (
    <div className="my-3">
      <Line>
        <Box borderTopColor="transparent" backgroundColor="white" />
      </Line>
    </div>
  )
}

export const TransparentLineWithSeperatorAtEnd = () => {
  return (

      <Line backgroundColor="black" >
        <BoxWithLeftRightBorder borderTopColor="transparent" borderBottomColor="transparent"></BoxWithLeftRightBorder>
      </Line>
  )
}

export const TransparentLineWithAngleAtCenter = () => {
  return (
   
      <Line backgroundColor="black">
        <BoxWithAngle borderLeftColor="transparent" borderTopColor="transparent"></BoxWithAngle>
      </Line>
   
  )
}

export const DashedLineDivider = () => {
  return <DashedLine></DashedLine>
}
export const DottedLineDivider = () => {
  return <DottedLine></DottedLine>
}

export const DoubleLineDivider = () => {
  return <DoubleLine></DoubleLine>
}
export const ZigzagDivider = () => {
  return <Zigzag></Zigzag>
}

export const AngleGradientDivider = () => {
  return (
    <Line>
      <BoxWithAngle
        borderLeftColor="transparent"
        borderTopColor="transparent"
        borderRightColor="black"
        borderBottomColor="black"
      />
      <BoxWithAngle
        borderLeftColor="black"
        borderTopColor="black"
        borderRightColor="transparent"
        borderBottomColor="transparent"
      />
    </Line>

  )
}




const StarCircle = styled.div`
position:relative;
left:50%;
top:0;
height:${(props)=>props.height||"40px"};
width:${(props)=>props.width||"40px"};
border-radius:50%;
transform:translate(-50%,-50%);
box-shadow:5px 5px 10px rgba(0,0,0,.6),-1px -5px 10px rgba(0,0,0,.6);
&::before{
content:"";
width:95%;
height:95%;
position:absolute;
left:0;
background:${(props)=>props.backgroundColor||"black"};
width: ${(props)=>props.width||"40px"};
aspect-ration:1;
 clip-path: polygon(100% 50%,78.98% 57.76%,93.3% 75%,71.21% 71.21%,75% 93.3%,57.76% 78.98%,50% 100%,42.24% 78.98%,25% 93.3%,28.79% 71.21%,6.7% 75%,21.02% 57.76%,0% 50%,21.02% 42.24%,6.7% 25%,28.79% 28.79%,25% 6.7%,42.24% 21.02%,50% 0%,57.76% 21.02%,75% 6.7%,71.21% 28.79%,93.3% 25%,78.98% 42.24%);

}

`;




export const DividerWithStarBorder = () => {
  return (
    <div className="py-2">
      <Line>
     <StarCircle></StarCircle>
    </Line>
    </div>
  );
}