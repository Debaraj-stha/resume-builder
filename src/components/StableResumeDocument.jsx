import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLayout } from "../provider/layoutProvider";
import { professionalTemplates } from "../static-data/professional-templates";
import { packBlocksByHeight } from "../utils/stableResumePagination";

const clean = (value) => String(value || "").trim();
const values = (items) => (Array.isArray(items) ? items : []).filter(Boolean);
const hasContent = (value) => {
  if (typeof value === "string") return Boolean(value.trim());
  if (Array.isArray(value)) return value.some(hasContent);
  if (value && typeof value === "object") return Object.values(value).some(hasContent);
  return false;
};
const contentItems = (items) => values(items).filter(hasContent);
const textItems = (items) => values(items).map((item) => clean(item?.value ?? item)).filter(Boolean);

const splitText = (text, limit = 560) => {
  const input = clean(text);
  if (!input) return [];
  const sentences = input.split(/(?<=[.!?])\s+/).filter(Boolean);
  const chunks = [];
  let current = "";
  sentences.forEach((sentence) => {
    if (current && `${current} ${sentence}`.length > limit) {
      chunks.push(current);
      current = sentence;
    } else current = current ? `${current} ${sentence}` : sentence;
  });
  if (current) chunks.push(current);
  return chunks;
};

const sectionStart = (key, title, content) => ({ key, content, title });
const continuation = (key, content) => ({ key, content });

const buildBlocks = (data) => {
  const blocks = [];
  const summary = splitText(data.summary);
  summary.forEach((paragraph, index) => blocks.push(index === 0
    ? sectionStart("summary-0", "Professional summary", <p>{paragraph}</p>)
    : continuation(`summary-${index}`, <p>{paragraph}</p>)));

  contentItems(data.experiences).forEach((experience, experienceIndex) => {
    const role = clean(experience.position) || "Professional experience";
    const employer = clean(experience.company_name);
    const dates = [clean(experience.start_date), clean(experience.end_date)].filter(Boolean).join(" – ");
    const location = clean(experience.location);
    const bullets = textItems(experience.achievements).flatMap((bullet) => splitText(bullet, 420));
    const lead = <div className="stable-role"><div><h3>{role}</h3>{employer ? <strong>{employer}</strong> : null}</div><small>{[dates, location].filter(Boolean).join(" · ")}</small>{clean(experience.about_company) ? <p>{clean(experience.about_company)}</p> : null}{bullets[0] ? <ul><li>{bullets[0]}</li></ul> : null}</div>;
    blocks.push(experienceIndex === 0 ? sectionStart(`experience-${experienceIndex}-0`, "Professional experience", lead) : continuation(`experience-${experienceIndex}-0`, lead));
    bullets.slice(1).forEach((bullet, bulletIndex) => blocks.push(continuation(`experience-${experienceIndex}-${bulletIndex + 1}`, <ul className="stable-continuation"><li>{bullet}</li></ul>)));
  });

  const itemSection = (items, title, key, render) => contentItems(items).forEach((item, index) => blocks.push(index === 0
    ? sectionStart(`${key}-${index}`, title, render(item, index))
    : continuation(`${key}-${index}`, render(item, index))));

  itemSection(data.educations, "Education", "education", (item) => <div className="stable-entry"><h3>{clean(item.degree) || clean(item.university)}</h3><strong>{clean(item.university)}</strong><small>{[clean(item.start_year), clean(item.end_year), clean(item.address)].filter(Boolean).join(" · ")}</small></div>);
  itemSection(data.certificates, "Licences & certifications", "certificate", (item) => <div className="stable-entry"><h3>{clean(item.certificate) || clean(item.subject)}</h3><span>{[clean(item.subject), clean(item.date)].filter(Boolean).join(" · ")}</span></div>);
  itemSection(data.trainings, "Training & continuing education", "training", (item) => <div className="stable-entry"><h3>{clean(item.title)}</h3><span>{[clean(item.organization), clean(item.year), clean(item.location)].filter(Boolean).join(" · ")}</span></div>);

  contentItems(data.skills).forEach((group, groupIndex) => {
    const skills = textItems(group.items);
    for (let index = 0; index < skills.length; index += 8) {
      const content = <div className="stable-skill-group"><h3>{clean(group.field) || "Clinical competencies"}</h3><p>{skills.slice(index, index + 8).join(" · ")}</p></div>;
      blocks.push(groupIndex === 0 && index === 0 ? sectionStart(`skill-${groupIndex}-${index}`, "Skills", content) : continuation(`skill-${groupIndex}-${index}`, content));
    }
  });

  itemSection(data.achievements, "Achievements", "achievement", (item) => <div className="stable-entry"><h3>{clean(item.achievement) || clean(item.field)}</h3><span>{[clean(item.field), clean(item.date)].filter(Boolean).join(" · ")}</span></div>);
  itemSection(data.languages, "Languages", "language", (item) => <div className="stable-entry stable-inline"><strong>{clean(item.language)}</strong><span>{clean(item.proficiency)}</span></div>);
  itemSection(data.awards, "Awards", "award", (item) => <div className="stable-entry"><h3>{clean(item.title)}</h3><span>{[clean(item.organization), clean(item.year)].filter(Boolean).join(" · ")}</span></div>);
  itemSection(data.strengths, "Professional strengths", "strength", (item) => <div className="stable-entry"><h3>{clean(item.title)}</h3><p>{clean(item.description)}</p></div>);
  itemSection(data.industryExpertise, "Clinical & industry expertise", "expertise", (item) => <div className="stable-entry stable-inline"><strong>{clean(item.tech)}</strong><span>{clean(item.value)}</span></div>);
  itemSection(data.passions, "Professional interests", "passion", (item) => <div className="stable-entry"><span>{clean(item.passion)}</span></div>);
  itemSection(data.my_time, "Professional activities", "activity", (item) => <div className="stable-entry stable-inline"><strong>{clean(item.activity)}</strong><span>{clean(item.value)}</span></div>);
  itemSection(data.openSourceWork, "Projects & professional contributions", "project", (item) => <div className="stable-entry"><h3>{clean(item.project_name)}</h3><strong>{clean(item.role)}</strong><p>{clean(item.description)}</p><span>{[textItems(item.technologies).join(" · "), clean(item.link), clean(item.date)].filter(Boolean).join(" · ")}</span></div>);

  contentItems(data.additionalSections).forEach((section, sectionIndex) => {
    textItems(section.items).flatMap((item) => splitText(item, 420)).forEach((item, itemIndex) => blocks.push(itemIndex === 0
      ? sectionStart(`additional-${sectionIndex}-${itemIndex}`, clean(section.title) || "Additional information", <ul><li>{item}</li></ul>)
      : continuation(`additional-${sectionIndex}-${itemIndex}`, <ul><li>{item}</li></ul>)));
  });
  return blocks;
};

const StableResumeDocument = memo(() => {
  const { layout_type, layout_id } = useParams();
  const { liveDetails, ref: pdfRef } = useLayout();
  const blockRefs = useRef([]);
  const headerRef = useRef(null);
  const [pages, setPages] = useState([]);
  const blocks = useMemo(() => buildBlocks(liveDetails || {}), [liveDetails]);
  const selectedTemplate = professionalTemplates.find((template) => template.layoutType === layout_type && template.layoutId === Number(layout_id));
  const showPhoto = Boolean(selectedTemplate?.photoReady && typeof liveDetails?.personalDetails?.profile === "string" && liveDetails.personalDetails.profile);
  const isClinicalSidebar = layout_type === "modern";

  useLayoutEffect(() => {
    const fullPageHeight = 952;
    const firstPageHeight = Math.max(650, fullPageHeight - Math.ceil(headerRef.current?.getBoundingClientRect().height || 0));
    const heights = blockRefs.current.slice(0, blocks.length).map((element) => element?.getBoundingClientRect().height || 0);
    if (isClinicalSidebar) {
      const sidebarPrefixes = ["skill-", "education-", "certificate-", "language-", "passion-", "achievement-"];
      const sidebarCandidates = blocks.map((block, index) => ({ block, index })).filter(({ block }) => sidebarPrefixes.some((prefix) => block.key.startsWith(prefix)));
      const sidebar = [];
      let sidebarHeight = 0;
      sidebarCandidates.forEach(({ index }) => {
        if (sidebarHeight + heights[index] <= firstPageHeight) {
          sidebar.push(index);
          sidebarHeight += heights[index];
        }
      });
      const sidebarSet = new Set(sidebar);
      const mainCandidates = blocks.map((_, index) => index).filter((index) => !sidebarSet.has(index));
      const mainPages = packBlocksByHeight(mainCandidates.map((index) => heights[index]), firstPageHeight, fullPageHeight)
        .map((page) => page.map((position) => mainCandidates[position]));
      const firstMain = mainPages.shift() || [];
      const remainder = mainPages.flat().sort((a, b) => a - b);
      const continuationPages = packBlocksByHeight(remainder.map((index) => heights[index]), fullPageHeight, fullPageHeight)
        .map((page) => ({ full: page.map((position) => remainder[position]) }));
      setPages([{ main: firstMain, sidebar }, ...continuationPages]);
      return;
    }
    const grouped = packBlocksByHeight(heights, firstPageHeight, fullPageHeight);
    setPages((grouped.length ? grouped : [blocks.map((_, index) => index)]).map((page) => ({ full: page })));
  }, [blocks, isClinicalSidebar, layout_id, layout_type, showPhoto]);

  const personal = liveDetails?.personalDetails || {};
  const renderBlock = (block, index) => <section className="stable-cv-block" data-block-key={block.key} key={block.key} ref={(element) => { blockRefs.current[index] = element; }}>{block.title ? <h2>{block.title}</h2> : null}{block.content}</section>;
  const displayPages = pages.length ? pages : [{ full: blocks.map((_, index) => index) }];

  return (
    <div ref={pdfRef} className={`stable-cv-document stable-format-${layout_type}`}>
      {displayPages.map((page, pageIndex) => (
        <article className="stable-cv-page" data-resume-page="true" key={pageIndex}>
          {pageIndex === 0 ? <header ref={headerRef} className="stable-cv-header">{showPhoto ? <img src={personal.profile} alt="Candidate portrait" /> : null}<div><h1>{clean(personal.name) || "Candidate name"}</h1><h3>{clean(personal.profession)}</h3><p>{[clean(personal.phone), clean(personal.email), clean(personal.address), ...values(personal.urls).map((url) => clean(url?.value))].filter(Boolean).join("  ·  ")}</p></div></header> : null}
          {page.main || page.sidebar ? <div className="stable-sidebar-body"><main>{(page.main || []).map((blockIndex) => renderBlock(blocks[blockIndex], blockIndex))}</main><aside>{(page.sidebar || []).map((blockIndex) => renderBlock(blocks[blockIndex], blockIndex))}</aside></div> : (page.full || []).map((blockIndex) => renderBlock(blocks[blockIndex], blockIndex))}
        </article>
      ))}
    </div>
  );
});

StableResumeDocument.displayName = "StableResumeDocument";
export default StableResumeDocument;
