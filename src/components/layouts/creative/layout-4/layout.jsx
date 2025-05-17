import getCreativeLayout4OuctputSectionData from "../layout-output/layout-4-output";
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"




const CreativeLayout4 = (props) => {
     return <BaseLayoutRenderer
    layoutId={4}
    getSectionDataFn={(key_val) => getCreativeLayout4OuctputSectionData(key_val, 4)}
    staticProps={props}
    layout_type={layout_type_map.CREATIVE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
}
export default CreativeLayout4