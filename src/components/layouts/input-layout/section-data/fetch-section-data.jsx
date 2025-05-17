import { layout_type_map } from "../../../../constant";
import {
  classicalLayouts,
  creativeLayouts,
  modernLayouts,
  simpleLayouts,
} from "./generateLayoutData";

// Map layout types to layout collections
const layoutMap = {
  [layout_type_map.CLASSICAL]: classicalLayouts,
  [layout_type_map.CREATIVE]: creativeLayouts,
  [layout_type_map.MODERN]: modernLayouts,
  [layout_type_map.SIMPLE]: simpleLayouts,
};

// Generic fetch function
export const fetchSectionData = ({
  layout_id,
  layout_type = layout_type_map.CLASSICAL,
  props={}
}) => {

  const layoutFn = layoutMap[layout_type] || classicalLayouts;
  const layouts = layoutFn(props);
  const key = `layout${Math.min(layout_id, Object.keys(layouts).length)}`;
  return layouts[key];
};
