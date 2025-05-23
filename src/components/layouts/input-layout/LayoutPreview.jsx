
import { LayoutWrapperWithBorder, ResumesWrapperDiv } from "../../elements/resumeWrapper";
import {  H3 } from "../../CustomComponents"
import LayoutByType from "../LayoutByType";
import { useParams } from "react-router-dom";



const LayoutPreview = () => {


   const {layout_type,layout_id}=useParams()
    return (
        <LayoutWrapperWithBorder padding="20px 20mm">
            <H3>Resume Preview</H3>
           

            <div className="flex justify-center items-center flex-col">
                <ResumesWrapperDiv className="w-full wrapper-div">
                    <LayoutByType key={`${layout_type}-${layout_id}`}></LayoutByType>
                </ResumesWrapperDiv>
            </div>
        </LayoutWrapperWithBorder>

    )
}
export default LayoutPreview