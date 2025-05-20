
import BaseLayoutRenderer from "../../BaseLayoutRenderer"
import getLayout1OutputSectionData from "../resume-output/layout1-output";

const ClassicalLayout1 = (props) => {

  return (
    <BaseLayoutRenderer
      layoutId={1}
      getSectionDataFn={(key_val) => getLayout1OutputSectionData(key_val, 1)}
      staticProps={props}
      shouldMeasureHeight={props.shouldMeasureHeight || false}
    />
  );
};

export default ClassicalLayout1;
