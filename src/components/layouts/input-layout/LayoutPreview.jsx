
import { LayoutWrapperWithBorder, ResumesWrapperDiv } from "../../elements/resumeWrapper";
import { H3 } from "../../CustomComponents"
import LayoutByType from "../LayoutByType";
import { useParams } from "react-router-dom";
import { useLayout } from "../../../provider/layoutProvider";
import Loading from "../../Loading";



const LayoutPreview = () => {
    const { layout_type, layout_id } = useParams()
    const { setDetailsUpdating, isDetailsUpdating } = useLayout()
    return (
        <LayoutWrapperWithBorder padding="20px 20mm">
            <H3>Resume Preview</H3>
            <div className="flex justify-center items-center flex-col">
                <ResumesWrapperDiv className="w-full wrapper-div">
                    {isDetailsUpdating ? <Loading message="updating details" />
                        :
                        <LayoutByType key={`${layout_type}-${layout_id}`}></LayoutByType>}
                </ResumesWrapperDiv>
            </div>
        </LayoutWrapperWithBorder>

    )
}
export default LayoutPreview