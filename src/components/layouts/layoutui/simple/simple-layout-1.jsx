import useDynamicLayoutSections from "../../loadResumeLayput";
import renderSimpleLayout from "./renderSimpleLayout";
const getSimpleLayout1 = ({ pages, layoutId, key_val, layout_type, sectionRefs,shouldImplementFlex }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    return renderSimpleLayout({
      pages,
      sectionData,
      sectionRefs,
      key_val,
      leftFlex:"3",
      rightFlex:"2",
      layoutId,     
      shouldImplementFlex
    });
};

export default getSimpleLayout1;