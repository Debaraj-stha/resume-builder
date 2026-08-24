const normalise = value => (value || "").toLowerCase().replace(/[^a-z0-9+#./\s-]/g," ").replace(/\s+/g," ").trim();
const hasAny = (text, terms) => terms.some(term=>text.includes(normalise(term)));
const result = (id,label,points,max,severity,found,missing,why,correction) => ({id,label,points,max,severity,found,missing,why,correction});
const keywords = text => [...new Set(normalise(text).split(" ").filter(x=>x.length>3&&!/[0-9]/.test(x)))];

const textValue = value => {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(textValue).filter(Boolean).join("\n");
  if (typeof value === "object") return Object.values(value).map(textValue).filter(Boolean).join("\n");
  return "";
};

export function cvDraftToScoringText(draft = {}) {
  const personal = draft.personalDetails || {};
  const sections = [
    ["CONTACT", [personal.name, personal.profession, personal.email, personal.phone, personal.address, personal.urls]],
    ["PROFESSIONAL SUMMARY", draft.summary],
    ["PROFESSIONAL EXPERIENCE", draft.experiences],
    ["EDUCATION AND QUALIFICATIONS", draft.educations],
    ["CLINICAL SKILLS AND COMPETENCIES", draft.skills],
    ["LICENCES AND CERTIFICATIONS", [draft.certificates, draft.licences, draft.registrations]],
    ["TRAINING AND CONTINUING EDUCATION", draft.trainings],
    ["ACHIEVEMENTS", draft.achievements],
    ["LANGUAGES", draft.languages],
    ["ADDITIONAL INFORMATION", draft.additionalSections],
  ];
  return sections.map(([heading, content]) => `${heading}\n${textValue(content)}`).join("\n\n");
}

export function compareAtsScores(currentScore, revisedScore) {
  const delta = revisedScore - currentScore;
  return { delta, direction: delta > 0 ? "improved" : delta < 0 ? "regressed" : "unchanged" };
}

export function scoreHealthcareCV({cvText="",jobDescription="",roleConfig,licenceAuthority=""}){
  const cv=normalise(cvText), jd=normalise(jobDescription); const checks=[];
  const sections=[["experience","employment","professional experience"],["education","qualification"],["skills","clinical skills","competencies"],["certification","licence","registration"]];
  const foundSections=sections.filter(group=>hasAny(cv,group)).length;
  checks.push(result("sections","Standard section headings",foundSections*2,8,"critical",`${foundSections}/4 core headings detected`,foundSections<4?"One or more standard headings":"None","ATS parsers use conventional headings to classify content.","Use Experience, Education, Clinical Skills and Licences & Certifications."));
  const contact=[/@/.test(cvText),/\+?\d[\d\s()-]{7,}/.test(cvText),/linkedin\.com|https?:\/\//i.test(cvText)].filter(Boolean).length;
  checks.push(result("contact","Readable contact details",contact*2,6,"critical",`${contact}/3 contact elements detected`,contact<2?"Email, phone or professional link":"None","Recruiters need machine-readable contact information.","Add plain-text email and phone near the top; avoid headers, icons-only labels and text boxes."));
  const roleSkills=roleConfig?.skills||[]; const matchedSkills=roleSkills.filter(skill=>hasAny(cv,[skill,skill.split(" ")[0]]));
  checks.push(result("clinical","Clinical relevance",Math.round(matchedSkills.length/Math.max(roleSkills.length,1)*25),25,"important",matchedSkills,roleSkills.filter(x=>!matchedSkills.includes(x)),"Role-specific evidence helps both ATS matching and clinical review.","Add only skills you genuinely possess and support them with context in experience bullets."));
  const licenceFound=licenceAuthority?cv.includes(normalise(licenceAuthority)):hasAny(cv,["licence","license","registration","eligibility"]);
  checks.push(result("licence","Credential and licence match",licenceFound?15:0,15,"critical",licenceFound?(licenceAuthority||"Licence wording detected"):"Not detected",licenceFound?"None":(licenceAuthority||"Licence or registration"),"Many healthcare roles legally require current registration or formal eligibility.","State authority, status and expiry month/year without publishing sensitive full document numbers."));
  const jdTerms=keywords(jd).filter(term=>!new Set(["with","from","that","this","will","your","have","work","role","team","healthcare","experience"]).has(term));
  const matchedJd=jdTerms.filter(term=>cv.includes(term)); const jdScore=jdTerms.length?Math.round(matchedJd.length/jdTerms.length*20):0;
  checks.push(result("jd","Job-description match",jdScore,20,"important",matchedJd.slice(0,20),jdTerms.filter(x=>!matchedJd.includes(x)).slice(0,20),"Relevant vacancy language improves matching when used naturally and truthfully.",jobDescription?"Review missing terms and add only those supported by your real experience.":"Paste the vacancy to calculate this score."));
  const quantified=(cvText.match(/\b\d+(?:\.\d+)?\s*(?:%|patients?|beds?|staff|hours?|minutes?|days?|cases?|prescriptions?|tests?)\b/gi)||[]).length;
  const actionVerbs=(roleConfig?.verbs||[]).filter(v=>cv.includes(v.toLowerCase())).length;
  checks.push(result("impact","Achievement strength",Math.min(16,quantified*3+actionVerbs*2),16,"important",`${quantified} quantified outcomes; ${actionVerbs} strong role verbs`,quantified?"None":"No measurable context detected","Evidence-based achievements are more credible than duty lists.","Add verified workload, time, quality, safety, training or cost context. Never invent a number."));
  const length=cv.split(" ").filter(Boolean).length; const completeness=Math.min(10,Math.round(length/80));
  checks.push(result("complete","Profile completeness",completeness,10,"optional",`${length} words analysed`,length<600?"CV may be incomplete":"None","Enough relevant content is needed to demonstrate eligibility and impact.","Complete all relevant sections; prioritise relevance over length."));
  const total=checks.reduce((sum,x)=>sum+x.points,0),max=checks.reduce((sum,x)=>sum+x.max,0);
  return {score:Math.round(total/max*100),scores:{atsReadability:Math.round((checks[0].points+checks[1].points)/14*100),jobMatch:jobDescription?Math.round(checks[4].points/20*100):null,clinicalRelevance:Math.round(checks[2].points/25*100),credentialMatch:Math.round(checks[3].points/15*100),achievementStrength:Math.round(checks[5].points/16*100),profileCompleteness:Math.round(checks[6].points/10*100)},checks};
}
