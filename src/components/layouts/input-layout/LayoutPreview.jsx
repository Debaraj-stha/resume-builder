
import { LayoutWrapperWithBorder, ResumesWrapperDiv } from "../../elements/resumeWrapper";
import { Button, FlexBox, H1, H3 } from "../../CustomComponents"
import LayoutByType from "../LayoutByType";
import { useLayout } from "../../../provider/layoutProvider";
import TextIconButton  from "../../IconButton";
import { FaDownLong } from "react-icons/fa6";


const LayoutPreview = () => {
    const { generatePDF } = useLayout()
    return (
        <LayoutWrapperWithBorder padding="20px 20mm">
            <H3>Resume Preview</H3>
            {/* <FlexBox alignItems="center">
                <H3>Resume Preview</H3>
                <TextIconButton onClick={generatePDF} text="Generate PDF" icon={<FaDownLong color="white" />}></TextIconButton>
            </FlexBox> */}

            <div className="flex justify-center items-center flex-col">
                <ResumesWrapperDiv className="w-full wrapper-div">
                    <LayoutByType></LayoutByType>
                </ResumesWrapperDiv>
            </div>
        </LayoutWrapperWithBorder>

    )
}
export default LayoutPreview