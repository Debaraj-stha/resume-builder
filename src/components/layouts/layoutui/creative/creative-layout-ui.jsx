
import { useEffect } from "react";
import useDynamicLayoutSections from "../../loadResumeLayput";
import renderLayout from "../render-ui";
import { useDivider } from "../../../../provider/DividerProvider";


const renderCreativeLayoutUI = ({ pages, layoutId, key_val, layout_type, sectionRefs,dividerType }) => {
    const {divider,changeDivider}=useDivider()
    useEffect(()=>{
        changeDivider(dividerType)
    },[dividerType])

    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type,divider);
    switch (layoutId) {
        case 1:
            return renderLayout({
                pages,
                sectionData,
                sectionRefs,
                key_val,
                layout_no: 2,
                leftFlex: "3",
                rightFlex: "2",
                props: {
                    layout: "curved",
                    leftPadding: "0",
                    rightPadding: "0"
                }
            })
        case 2:
            return renderLayout({
                pages,
                sectionData,
                sectionRefs,
                key_val,
                layout_no: 2,
                leftFlex: "3",
                rightFlex: "2",
                props: {
                    layout: "line",
                    leftPadding: "0 15px 0 0",
                    rightPadding: "0 0 0 15px"
                }
            })
        case 3:
            return renderLayout({
                pages,
                sectionData,
                sectionRefs,
                key_val,
                layout_no: 3,
                leftFlex: "3",
                rightFlex: "2",
                props: {
                    // layout: "line",
                    leftPadding: "0 15px 0 0",
                    rightPadding: "0 0 0 15px"
                }
            })

        case 4:
            return renderLayout({
                pages,
                sectionData,
                sectionRefs,
                key_val,
                layout_no: 4,
                leftFlex: "4",
                rightFlex: "2",
                background: "#a32e2e",
                props: {
                    mainPadding: "0 0 0 20mm",
                    leftPadding: "20mm 15px 0 0",
                    personalDetailsOnLeft: true,
                    includeNameInitial: true
                }
            })
        case 5:
            return renderLayout({
                pages,
                sectionData,
                sectionRefs,
                key_val,
                layout_no: 5,
                leftFlex: "3",
                rightFlex: "2",
           
                props: {
                    leftPadding: "10mm 15px 0 20mm",
                    rightPadding:"10mm 20mm 0 15px",
                    mainPadding:"0"
                    
                    
                }
            })

    }

}
export default renderCreativeLayoutUI