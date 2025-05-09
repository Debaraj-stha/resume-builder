import React from "react";
import styled from "styled-components";
import { LayoutWrapperWithBorder, ResumesWrapperDiv } from "../../elements/resumeWrapper";
import { Button, FlexBox, H1 } from "../../CustomComponents"
import LayoutByType from "../LayoutByType";
import LayoutProvider, { useLayout } from "../../../provider/layoutProvider";
import TextIconButton, { IconButton } from "../../IconButton";
import { FaDownLong } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";

const LayoutPreview = () => {
    const { generatePDF,complie_input} = useLayout()
    return (
          <LayoutWrapperWithBorder>
            <H1>Resume Preview</H1>
            <div className="flex justify-center items-center flex-col">
                <FlexBox>
                <TextIconButton  onClick={complie_input} id="modern" text="Compile Now" icon={<FaCogs color="white" />}></TextIconButton>
                <TextIconButton onClick={generatePDF} text="Generate PDF" icon={<FaDownLong color="white"/>}></TextIconButton>
                </FlexBox>
                <ResumesWrapperDiv  className="w-full wrapper-div">
                    <LayoutByType></LayoutByType>
                </ResumesWrapperDiv>
            </div>
        </LayoutWrapperWithBorder>
    
    )
}
export default LayoutPreview