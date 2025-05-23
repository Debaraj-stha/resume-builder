import getModernLayout1OutputSectionData from "../layout-output/layout-1-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";
import { layout_type_map } from "../../../../constant";
const ModernLayout1 = (props) => {
  return <BaseLayoutRenderer
    layoutId={1}
    getSectionDataFn={(key_val) => getModernLayout1OutputSectionData(key_val, 1)}
    staticProps={props}
    layout_type={layout_type_map.MODERN}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
}

export default ModernLayout1;
