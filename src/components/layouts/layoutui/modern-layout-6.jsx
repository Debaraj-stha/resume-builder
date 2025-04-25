
import useDynamicLayoutSections from "../loadResumeLayput";
import renderLayout from "./render-ui";
const getModernLayout6 = ({ pages, layoutId, key_val, layout_type, sectionRefs }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    return renderLayout({
      pages,
      sectionData,
      sectionRefs,
      key_val,
      leftFlex:"3",
      rightFlex:"2",
     layout_no:layoutId
    });
  
  
};

export default getModernLayout6;
