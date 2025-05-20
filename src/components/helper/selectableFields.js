import { layout_type_map } from "../../constant";
const classicalLayoutSelectable = {
    1: ["experiences", "educations", "achievements"]
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
const getSelectableFields = ({ layout_type = layout_type_map.CLASSICAL, layout_no = 1 } = {}) => {
  if (layout_type === layout_type_map.MODERN) {
    return modernLayoutSelectable[layout_no];
  }
  if (layout_type === layout_type_map.CREATIVE) {
    return creativeLayoutSelectable[layout_no];
  }
  if (layout_type === layout_type_map.SIMPLE) {
    return simpleLayoutSelectable[layout_no];
  }
  return classicalLayoutSelectable[layout_no]; // default fallback
};

export default getSelectableFields