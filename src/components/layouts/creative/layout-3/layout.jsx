import getCreativeLayout3OuctputSectionData from "../layout-output/layout-3-output";
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";




const CreativeLayout3 = (props) => {
   return <BaseLayoutRenderer
    layoutId={3}
    getSectionDataFn={(key_val) => getCreativeLayout3OuctputSectionData(key_val, 3)}
    staticProps={props}
    layout_type={layout_type_map.CREATIVE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
}
export default CreativeLayout3