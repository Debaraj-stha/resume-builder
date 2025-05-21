import { layout_type_map } from "../constant";
const classicalLayoutSelectable = {
  1: ["experiences", "educations", "achievements"],
  2: ["experiences", "educations", "achievements", "strengths"],
  3: ["experiences", "educations"],
  4: ["experiences", "educations", "achievements", "certificates"],
  5: ["experiences", "educations", "achievements", "certificates"],
  6: ["experiences", "educations", "certificates"],
}
const modernLayoutSelectable = {
  1: ["experiences", "educations", "achievements"]
}
const creativeLayoutSelectable = {
  1: ["experiences", "educations", "achievements"]
}
const simpleLayoutSelectable = {
  1: ["experiences", "educations", "achievements"]
}
const getSelectableFields = ({ layout_type = layout_type_map.CLASSICAL, layout_id = 1 }) => {
  layout_id = parseInt(layout_id, 10);
  if (layout_type === layout_type_map.MODERN) {
    return modernLayoutSelectable[layout_id];
  }
  if (layout_type === layout_type_map.CREATIVE) {
    return creativeLayoutSelectable[layout_id];
  }
  if (layout_type === layout_type_map.SIMPLE) {
    return simpleLayoutSelectable[layout_id];
  }
  return classicalLayoutSelectable[layout_id]; // default fallback
};

export default getSelectableFields