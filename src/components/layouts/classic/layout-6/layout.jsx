
import getLayout6OutputSectionData from "../resume-output/layout6-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"
const ClassicalLayout6 = (props) => {
  return (
    <BaseLayoutRenderer
      layoutId={6}
      getSectionDataFn={(key_val) => getLayout6OutputSectionData(key_val, 6)}
      staticProps={props}
      shouldMeasureHeight={props.shouldMeasureHeight || false}
    />
  );
};

export default ClassicalLayout6;
