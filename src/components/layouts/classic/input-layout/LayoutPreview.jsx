import React from "react";
import styled from "styled-components";
import { LayoutWrapperWithBorder, ResumesWrapperDiv } from "../../../elements/resumeWrapper";
import { Button, H1 } from "../../../CustomComponents"
import LayoutByType from "../../LayoutByType";
import { useLayout } from "../../../../provider/layoutProvider";
import TextIconButton, { IconButton } from "../../../IconButton";
import { FaDownLong } from "react-icons/fa6";

const LayoutPreview = () => {
    const { generatePDF} = useLayout()
    return (
        <LayoutWrapperWithBorder>
            <H1>Resume Preview</H1>
            <div className="flex justify-center items-center flex-col">
                <TextIconButton onClick={generatePDF} text="Generate PDF" icon={<FaDownLong/>}></TextIconButton>
                <ResumesWrapperDiv  className="w-full wrapper-div">
                    <LayoutByType></LayoutByType>
                </ResumesWrapperDiv>
            </div>

        </LayoutWrapperWithBorder>
    )
}
export default LayoutPreview