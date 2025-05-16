
import getModernLayout3OutputSectionData from "../layout-output/layout-3-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"
import { layout_type_map } from "../../../../constant";
const ModernLayout3 = (props) => {
    return <BaseLayoutRenderer
  layoutId={3}
  getSectionDataFn={(key_val) => getModernLayout3OutputSectionData(key_val, 3)}
  staticProps={props}
  layout_type={layout_type_map.MODERN}
  shouldMeasureHeight={props.shouldMeasureHeight || false}
/>
}
export default ModernLayout3