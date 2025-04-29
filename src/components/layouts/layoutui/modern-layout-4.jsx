
import useDynamicLayoutSections from "../loadResumeLayput";
import renderLayout from "./render-ui";
const getModernLayout4 = ({ pages, layoutId, key_val, layout_type, sectionRefs }) => {
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
          leftPadding:"0 15px 0 0",
          rightPadding:"0"
      }
    });
};

export default getModernLayout4;
