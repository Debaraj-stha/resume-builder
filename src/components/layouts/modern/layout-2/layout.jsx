
import { layout_type_map } from "../../../../constant";
import getModernLayout2OutputSectionData from "../layout-output/layout2-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"
const ModernLayout2 = (props) => {
  return <BaseLayoutRenderer
  layoutId={2}
  getSectionDataFn={(key_val) => getModernLayout2OutputSectionData(key_val, 2)}
  staticProps={props}
  layout_type={layout_type_map.MODERN}
  shouldMeasureHeight={props.shouldMeasureHeight || false}
/>
}
export default ModernLayout2