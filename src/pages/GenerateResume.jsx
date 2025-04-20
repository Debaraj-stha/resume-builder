import React from "react";
import styled from "styled-components"
import {H1, Hspace} from "../components/CustomComponents"

import LayoutProvider, { useLayout } from "../provider/layoutProvider";
import LayoutInputField from "../components/layouts/classic/input-layout/LayoutInputField";
import LayoutPreview from "../components/layouts/classic/input-layout/LayoutPreview";
const MainWrapper=styled.section`
width:100vw;
height:auto;
min-height:100vh;
position:relative;
inset:0;
background:${({theme})=>theme.colors.bg};
`


const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 1024px) {
    /* Large screens and up (Tailwind's lg breakpoint) */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;


const GenerateResume=()=>{
    const {theme,isLoading}=useLayout()
    if(isLoading){
        return <H1>Loading...</H1>
    }
    return(
        <MainWrapper>
            <Hspace/>
            <ResponsiveGrid>
                <LayoutInputField/>
                <LayoutPreview/>
            </ResponsiveGrid>
            

        </MainWrapper>
    )
}
export default GenerateResume