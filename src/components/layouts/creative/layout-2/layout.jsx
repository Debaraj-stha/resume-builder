import getCreativeLayout2OuctputSectionData from "../layout-output/layout-2.output";
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";

const CreativeLayout2 = (props) => {
   return <BaseLayoutRenderer
    layoutId={2}
    getSectionDataFn={(key_val) => getCreativeLayout2OuctputSectionData(key_val, 2)}
    staticProps={props}
    layout_type={layout_type_map.CREATIVE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  /> 
}
export default CreativeLayout2