import getSimpleLayout2SectionData from "../layout-output/layout-2-output";
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";

const SimpleLayout2 = (props) => {   
   return <BaseLayoutRenderer
    layoutId={2}
    getSectionDataFn={
      (key_val) => getSimpleLayout2SectionData(key_val, 2)}
    staticProps={props}
    layout_type={layout_type_map.SIMPLE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
};

export default SimpleLayout2;
