
import getLayout2OutputSectionData from "../resume-output/layout2-output";
import { strengths } from "../../../../static-data/resume-sample-data";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"

const ClassicalLayout2 = (props) => {
  return (
    <BaseLayoutRenderer
      layoutId={2}
      getSectionDataFn={(key_val) => getLayout2OutputSectionData(key_val, 2)}
      staticProps={props}
      shouldMeasureHeight={props.shouldMeasureHeight || false}
    />
  );
};

export default ClassicalLayout2;
