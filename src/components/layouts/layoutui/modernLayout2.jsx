
import { useEffect } from "react";
import { useDivider } from "../../../provider/DividerProvider";
import useDynamicLayoutSections from "../loadResumeLayput";
import renderLayout from "./render-ui";

const getModernLayout2 = ({ pages, layoutId, key_val, layout_type, sectionRefs, dividerType}) => {
  const { divider, changeDivider } = useDivider()
  useEffect(() => {
    changeDivider(dividerType)
  }, [dividerType])
  const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type, divider)
  return renderLayout({
    pages,
    sectionData,
    sectionRefs,
    key_val,
    leftFlex: "2",
    rightFlex: "3",
    props: {
      leftPadding: "0 15px 0 0",
      rightPadding: "0"
    }

  });
};

export default getModernLayout2