import getSimpleLayout1SectionData from "../layout-output/layout-1-output";
import { layout_type_map } from "../../../../constant";
import BaseLayoutRenderer from "../../BaseLayoutRenderer";



const SimpleLayout1 = (props) => {
      return <BaseLayoutRenderer
    layoutId={1}
    getSectionDataFn={(key_val) => getSimpleLayout1SectionData(key_val, 1)}
    staticProps={props}
    layout_type={layout_type_map.SIMPLE}
    shouldMeasureHeight={props.shouldMeasureHeight || false}
  />
};

export default SimpleLayout1;
