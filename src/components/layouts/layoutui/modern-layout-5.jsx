
import useDynamicLayoutSections from "../loadResumeLayput";
import renderLayout from "./render-ui";
const getModernLayout5 = ({ pages, layoutId, key_val, layout_type, sectionRefs }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    return renderLayout({
      pages,
      sectionData,
      sectionRefs,
      key_val,
      leftFlex:"3",
      rightFlex:"2",
     layout_no:layoutId,
     props:{
      leftPadding:"10px 15px 0 20mm",
      rightPadding:"10px 20mm 0 15px",
      mainPadding:"0 0 0 0"
     }
    });
  
  
};

export default getModernLayout5;
