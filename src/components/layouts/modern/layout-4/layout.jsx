import getModernLayout4OutputSectionData from "../layout-output/layout4-output";
import BaseLayoutRenderer from "../../BaseLayoutRenderer"
import { layout_type_map } from "../../../../constant";


const ModernLayout4 = (props) => {
   return <BaseLayoutRenderer
  layoutId={4}
  getSectionDataFn={(key_val) => getModernLayout4OutputSectionData(key_val, 4)}
  staticProps={props}
  layout_type={layout_type_map.MODERN}
  shouldMeasureHeight={props.shouldMeasureHeight || false}
/>
}
export default ModernLayout4