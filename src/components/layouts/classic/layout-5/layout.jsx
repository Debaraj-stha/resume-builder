import { certificates } from "../../../../static-data/resume-sample-data";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"
import getLayout5OutputSectionData from "../resume-output/layout5-output";

const ClassicalLayout5 = (props) => {
  return (
    <BaseLayoutRenderer
      layoutId={5}
      getSectionDataFn={(key_val) => getLayout5OutputSectionData(key_val, 5)}
      staticProps={props}
      shouldMeasureHeight={props.shouldMeasureHeight || false}
    />
  );
};

export default ClassicalLayout5;
