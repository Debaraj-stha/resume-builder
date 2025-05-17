
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";
import getSimpleLayout4SectionData from "../layout-output/layout-4-output";




const SimpleLayout4 = (props) => {
   return <BaseLayoutRenderer
    layoutId={4}
    getSectionDataFn={
      (key_val) => getSimpleLayout4SectionData(key_val, 4)}
    staticProps={props}
    layout_type={layout_type_map.SIMPLE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
}

export default SimpleLayout4;
