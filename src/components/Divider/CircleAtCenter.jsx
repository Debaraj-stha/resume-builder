import React from "react";
import styled from "styled-components";
const Line=styled.div`
width:90%;
max-width:100%;
height:2px;
border-radius:5px;
background:${(props)=>props.cbackgroundColor||"#2c3e50"};
position:relative;
background:linear-gradient(to right,transparent,${(props)=>props.cbackgroundColor||"#2c3e50"},${(props)=>props.cbackgroundColor||"#2c3e50"},transparent);
`
const SectionDivider = styled.div`
position:relative;
&::before{
content: "";
width: 30px;
height: 30px;
background: ${(props)=>props.cbackgroundColor||"#2c3e50"};
border-radius: 100%;
position: absolute;
top: -30px;
left: calc(50% - 40px);
transform:translateY(50%);
line-height: 72px;
text-indent: 15px;
font-size: 36px;
}
`
const CircleAtCenter = () => {
    return (
        <Line>
        <SectionDivider>

        </SectionDivider>
        </Line>
    )
}
export default CircleAtCenter