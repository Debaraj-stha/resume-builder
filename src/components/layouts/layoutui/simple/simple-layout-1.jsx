import { useEffect } from "react";
import { useDivider } from "../../../../provider/DividerProvider";
import useDynamicLayoutSections from "../../loadResumeLayput";
import renderSimpleLayout from "./renderSimpleLayout";
const getSimpleLayout1 = ({ pages, layoutId, key_val, layout_type, sectionRefs, shouldImplementFlex ,dividerType}) => {
  const {divider,changeDivider}=useDivider()
      useEffect(()=>{
          changeDivider(dividerType)
      },[dividerType])
  const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type,divider)
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