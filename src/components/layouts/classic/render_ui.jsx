import { Section } from "../../elements/resumeSectionWrapper";
import { ResumeWrapper } from "../../elements/resumeWrapper";

import useDynamicLayoutSections from "../loadResumeLayput";
import renderUI from "../render-ui";
const renderClassicalUI=({pages,key_val,layout_type,layoutId,sectionRefs})=>{
return renderUI({pages,key_val,layoutId,layout_type,sectionRefs})
}

export default renderClassicalUI