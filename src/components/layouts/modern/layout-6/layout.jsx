

import { layout_type_map } from "../../../../constant";
import getModernLayout6OutputSectionData from "../layout-output/layout6-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"

const ModernLayout6 = (props) => {
       return   <BaseLayoutRenderer
  layoutId={6}
  getSectionDataFn={(key_val) => getModernLayout6OutputSectionData(key_val, 6)}
  staticProps={props}
  layout_type={layout_type_map.MODERN}
  shouldMeasureHeight={props.shouldMeasureHeight || false}
/>
}
export default ModernLayout6