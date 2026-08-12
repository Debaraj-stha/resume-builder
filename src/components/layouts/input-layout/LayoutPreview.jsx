
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
        <LayoutWrapperWithBorder className="preview-card" padding="0">
            <div className="preview-heading"><div><span>LIVE DOCUMENT</span><H3>Resume preview</H3></div><small>A4 · ATS-friendly</small></div>
            <div className="preview-stage">
                <ResumesWrapperDiv className="preview-canvas wrapper-div">
                    {isDetailsUpdating ? <Loading message="updating details" />
                        :
                        <LayoutByType key={`${layout_type}-${layout_id}`}></LayoutByType>}
                </ResumesWrapperDiv>
            </div>
        </LayoutWrapperWithBorder>

    )
}
export default LayoutPreview
