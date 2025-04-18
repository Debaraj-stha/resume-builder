import React from "react";
import styled from "styled-components";
import { LayoutWrapperWithBorder } from "../../../elements/resumeWrapper";
import {H1} from "../../../CustomComponents"
import ClassicalLayout1 from "../ClassicalLayout1";

const LayoutPreview=()=>{
    return(
        <LayoutWrapperWithBorder>
            <H1>Resume Preview</H1>
            <ClassicalLayout1/>
        </LayoutWrapperWithBorder>
    )
}
export default LayoutPreview