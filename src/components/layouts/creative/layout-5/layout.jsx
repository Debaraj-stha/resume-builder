import getCreativeLayout5OuctputSectionData from "../layout-output/layout-5-output";
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";






const CreativeLayout5 = (props) => {
   return <BaseLayoutRenderer
    layoutId={5}
    getSectionDataFn={(key_val) => getCreativeLayout5OuctputSectionData(key_val, 5)}
    staticProps={props}
    layout_type={layout_type_map.CREATIVE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
}
export default CreativeLayout5