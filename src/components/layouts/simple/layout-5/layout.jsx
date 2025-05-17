import getSimpleLayout5SectionData from "../layout-output/layout-5-output";
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";



const SimpleLayout5 = (props) => {
   return <BaseLayoutRenderer
    layoutId={5}
    getSectionDataFn={
      (key_val) => getSimpleLayout5SectionData(key_val, 5)}
    staticProps={props}
    layout_type={layout_type_map.SIMPLE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
};

export default SimpleLayout5;
