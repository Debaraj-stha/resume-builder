import BaseLayoutRenderer from "../../BaseLayoutRenderer"
import getLayout3OutputSectionData from "../resume-output/layout4-output";

const ClassicalLayout3 = (props) => {
  return (
    <BaseLayoutRenderer
      layoutId={3}
      getSectionDataFn={(key_val) => getLayout3OutputSectionData(key_val, 3)}
      staticProps={props}
      shouldMeasureHeight={props.shouldMeasureHeight || false}
    />
  );
};

export default ClassicalLayout3;
