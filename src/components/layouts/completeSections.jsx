import React from "react";
import { SectionContent } from "../elements/resumeSectionWrapper";
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections } from "./helper";
import generateLanguage from "./section-data/language_section_data";
import generateSkill from "./section-data/skill_section_data";
import generateTitle from "./section-data/titleGenerater";
import generateTrainingsectionData from "./section-data/trainings_section_data";

const textStyle = { color: "#263746", fontSize: "11px", lineHeight: 1.5, overflowWrap: "anywhere" };
const headingStyle = { color: "#132f43", fontSize: "14px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em" };
const subHeadingStyle = { color: "#163c54", fontSize: "12px", fontWeight: 750, lineHeight: 1.35 };
const neutralStyle = { sectionHeader: headingStyle, sectionSubHeader: subHeadingStyle, h2: subHeadingStyle, h3: subHeadingStyle, p: textStyle, primaryColor: "#0f766e" };
const hasText = (value) => typeof value === "string" && value.trim().length > 0;
const meaningful = (items, fields) => Array.isArray(items) && items.some((item) => item && fields.some((field) => hasText(item[field])));
const hasKey = (sections, prefixes) => sections.some((section) => prefixes.some((prefix) => String(section?.key || "").startsWith(prefix)));

const genericSection = (section, index, divider) => ({
  key: `additional_${index}`,
  content: () => <>
    {generateTitle({ title: section.title || "Additional information", style: headingStyle })}
    {divider || null}
    <SectionContent>
      <ul style={{ margin: "6px 0 0", paddingLeft: "18px" }}>
        {(section.items || []).filter((item) => hasText(item?.value)).map((item, itemIndex) => <li key={itemIndex} style={{ ...textStyle, marginBottom: "4px" }}>{item.value}</li>)}
      </ul>
    </SectionContent>
  </>
});

export const ensureCompleteSections = (sections, data, divider) => {
  const output = [...(sections || [])];
  if (meaningful(data.experiences, ["company_name", "position"]) && !hasKey(output, ["experience"])) output.push(...generateExperienceSections({ experiences: data.experiences, style: neutralStyle, divider }));
  if (meaningful(data.educations, ["university", "degree"]) && !hasKey(output, ["education"])) output.push(...generateEducationSections({ educations: data.educations, style: neutralStyle, divider }));
  if (meaningful(data.certificates, ["certificate", "subject"]) && !hasKey(output, ["certificate"])) output.push(...generateCertipicates({ certificates: data.certificates, style: neutralStyle, divider }));
  if (meaningful(data.achievements, ["achievement", "field"]) && !hasKey(output, ["achievement"])) output.push(...generateAchievementsSections({ achievements: data.achievements, style: neutralStyle, divider }));
  if (Array.isArray(data.skills) && data.skills.some((group) => Array.isArray(group?.items) && group.items.some((item) => hasText(item?.value))) && !hasKey(output, ["skills"])) output.push(generateSkill({ skills: data.skills, style: neutralStyle, divider }));
  if (meaningful(data.trainings, ["title", "organization"]) && !hasKey(output, ["trainings"])) output.push(generateTrainingsectionData({ trainings: data.trainings, style: neutralStyle, divider, titleHeader: "Training and continuing education" }));
  if (meaningful(data.languages, ["language", "proficiency"]) && !hasKey(output, ["language"])) output.push(generateLanguage({ languages: data.languages, style: { ...neutralStyle, progressBar: { height: "0" } }, divider, props: { shouldIncludeProficiency: true } }));
  (data.additionalSections || []).filter((section) => hasText(section?.title) && Array.isArray(section.items)).forEach((section, index) => output.push(genericSection(section, index, divider)));
  return output;
};
