import React from "react";
import styled from "styled-components";
const IconHolder=styled.div`
width:50px;
height:50px;
border-radius:50%;
background:${({theme,background})=>background||theme.colors.icons.default.bg};
display:flex;
align-items:center;
align-content:center;
margin:0px 5px;

`
const RoundedIcon = React.memo(({children,background}) => {
    return (
        <IconHolder background={background}>
           {children}
        </IconHolder>
    )
})
export default RoundedIcon