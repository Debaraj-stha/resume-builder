import { certificates } from "../../../../static-data/resume-sample-data";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"
import getLayout4OutputSectionData from "../resume-output/layout4-output";

const ClassicalLayout4 = (props) => {
  return (
    <BaseLayoutRenderer
      layoutId={4}
      getSectionDataFn={(key_val) => getLayout4OutputSectionData(key_val, 4)}
      staticProps={props}
      shouldMeasureHeight={props.shouldMeasureHeight || false}
    />
  );
};

export default ClassicalLayout4;
