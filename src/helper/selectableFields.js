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
  1: ["experiences", "educations", "achievements", "languages", "industryExpertise"],
  2: ["experiences", "educations", "languages", "industryExpertise", "openSourceWork"],
  3: ["experiences", "educations", "languages", "strengths"],
  4: ["experiences", "educations", "passions", "strengths", "industryExpertise", "achievements"],
  5: ["experiences", "educations", "strengths", "industryExpertise"],
  6: ["experiences", "educations", "strengths", "industryExpertise", "achievements", "languages"],
}
const creativeLayoutSelectable = {
  1: ["experiences", "educations", "achievements", "strengths"],
  2: ["experiences", "educations", "achievements", "strengths","industryExpertise"],
  3: ["experiences", "educations", "awards","trainings","languages","my_time"],
  4: ["experiences", "educations", "languages", "achievements","my_time","certificates","passions"],
  5: ["experiences", "educations", "strengths", "achievements","languages","passions"],

}
const simpleLayoutSelectable = {
  1: ["experiences", "educations", "achievements", "openSourceWork"],
  2: ["experiences", "educations", "languages", "strengths"],
  3: ["experiences", "educations", "strengths"],
  4: ["experiences", "educations", "certificates"],
  5: ["experiences", "educations", "languages", "achievements"],
  6: ["experiences", "educations", "certificates", "achievements"],
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