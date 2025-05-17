

import { layout_type_map } from "../../../../constant";
import getModernLayout5OutputSectionData from "../layout-output/layout5-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"



const ModernLayout5 = (props) => {
   return   <BaseLayoutRenderer
  layoutId={5}
  getSectionDataFn={(key_val) => getModernLayout5OutputSectionData(key_val, 5)}
  staticProps={props}
  layout_type={layout_type_map.MODERN}
  shouldMeasureHeight={props.shouldMeasureHeight || false}
/>
}
export default ModernLayout5