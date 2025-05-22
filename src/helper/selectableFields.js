import { layout_type_map } from "../constant";
const classicalLayoutSelectable = {
  1: ["experiences", "educations", "achievements","skills"],
  2: ["experiences", "educations", "achievements", "strengths","skills"],
  3: ["experiences", "educations","skills"],
  4: ["experiences", "educations", "achievements", "certificates","skills"],
  5: ["experiences", "educations", "achievements", "certificates","skills"],
  6: ["experiences", "educations", "certificates","skills"],
}
const modernLayoutSelectable = {
  1: ["experiences", "educations", "achievements", "languages", "industryExpertise","skills"],
  2: ["experiences", "educations", "languages", "industryExpertise", "openSourceWork","skills"],
  3: ["experiences", "educations", "languages", "strengths","skills"],
  4: ["experiences", "educations", "passions", "strengths", "industryExpertise", "achievements","skills"],
  5: ["experiences", "educations", "strengths", "industryExpertise","skills"],
  6: ["experiences", "educations", "strengths", "industryExpertise", "achievements", "languages","skills"],
}
const creativeLayoutSelectable = {
  1: ["experiences", "educations", "achievements", "strengths","skills"],
  2: ["experiences", "educations", "achievements", "strengths","industryExpertise","skills"],
  3: ["experiences", "educations", "awards","trainings","languages","my_time","skills"],
  4: ["experiences", "educations", "languages", "achievements","my_time","certificates","passions","skills"],
  5: ["experiences", "educations", "strengths", "achievements","languages","passions"],

}
const simpleLayoutSelectable = {
  1: ["experiences", "educations", "achievements", "openSourceWork","skills"],
  2: ["experiences", "educations", "languages", "strengths","skills"],
  3: ["experiences", "educations", "strengths","skills"],
  4: ["experiences", "educations", "certificates","skills"],
  5: ["experiences", "educations", "languages", "achievements","skills"],
  6: ["experiences", "educations", "certificates", "achievements","skills"],
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