import useDynamicLayoutSections from "../../loadResumeLayput";
import renderSimpleLayout from "./renderSimpleLayout";
const getSimpleLayout1 = ({ pages, layoutId, key_val, layout_type, sectionRefs, shouldImplementFlex }) => {
  const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
  return renderSimpleLayout({
    pages,
    sectionData,
    sectionRefs,
    key_val,
    leftFlex: "3",
    rightFlex: "2",
    layoutId,
    shouldImplementFlex,
    props: {
      leftPadding: "0 10mm 0 0",
      rightPadding: "0 0 0 10mm",
      mainPadding: "20mm",
    }
  });
};

export default getSimpleLayout1;