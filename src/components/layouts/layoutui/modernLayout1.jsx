import useDynamicLayoutSections from "../loadResumeLayput";
import renderLayout from "./render-ui";

const getModernLayout1 = ({ pages, layoutId, key_val, layout_type, sectionRefs }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    return renderLayout({
        pages,
        sectionData,
        sectionRefs,
        key_val,
        layout_no:1,
        leftFlex:"3",
        rightFlex:"2",
        background:"#1c2a45",
        props:{
          mainPadding:"0 0 0 20mm",
          leftPadding:"20mm 15px 0 0",
          personalDetailsOnLeft:true
        }
       
      });

    };

export default getModernLayout1;
