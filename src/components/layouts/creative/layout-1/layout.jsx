import { layout_type_map } from "../../../../constant";
import getCreativeLayout1OuctputSectionData from "../layout-output/layout-1-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"



const CreativeLayout1 = (props) => {
  return <BaseLayoutRenderer
    layoutId={1}
    getSectionDataFn={(key_val) => getCreativeLayout1OuctputSectionData(key_val, 1)}
    staticProps={props}
    layout_type={layout_type_map.CREATIVE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
}
export default CreativeLayout1