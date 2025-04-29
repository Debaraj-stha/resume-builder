import { CreativeResumeWrapperWithLine } from "../../../elements/resumeWrapper";
import useDynamicLayoutSections from "../../loadResumeLayput";
import renderLayout from "../render-ui";


const renderCreativeLayoutUI = ({ pages, layoutId, key_val, layout_type, sectionRefs, shouldImplementFlex }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    if (layoutId == 1) {
        return <CreativeResumeWrapperWithLine/>
        // return renderLayout({
        //     pages,
        //     sectionData,
        //     sectionRefs,
        //     key_val,
        //     layout_no: 2,
        //     leftFlex: "3",
        //     rightFlex: "2",
        //     props:{
        //         layout:"curved"
        //     }
        // })
    }
}
export default renderCreativeLayoutUI