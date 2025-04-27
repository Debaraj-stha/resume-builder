import { layout_type_map } from "../../../../constant";
import { LeftColumn, RightColumn, Section } from "../../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../../../elements/resumeWrapper";
import renderUI from "../../render-ui";
import renderLayout, { Wrapper } from "../render-ui";
layout_type_map
const renderSimpleLayout = ({
    pages,
    sectionData,
    sectionRefs,
    key_val,
    layoutId,
    leftFlex = "2",
    rightFlex = "3",
    shouldImplementFlex = false

}) => {
    if (shouldImplementFlex) {
        return renderLayout({
            pages,
            sectionData,
            sectionRefs,
            key_val,
            layout_no: 2,
            leftFlex:"3",
            rightFlex:"2"
        })
    }
    else {
        return renderUI({ pages, key_val, layoutId, sectionRefs, layout_type: layout_type_map.SIMPLE })
    }

}

export default renderSimpleLayout