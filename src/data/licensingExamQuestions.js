export const licensingAuthorities = [
  { id: "DHA", name: "DHA", region: "Dubai, UAE" },
  { id: "DOH", name: "DOH", region: "Abu Dhabi, UAE" },
  { id: "MOHAP", name: "MOHAP", region: "Northern Emirates, UAE" },
  { id: "SCFHS", name: "SCFHS", region: "Saudi Arabia" },
  { id: "DHP", name: "DHP", region: "Qatar" },
  { id: "NHRA", name: "NHRA", region: "Bahrain" },
  { id: "OMSB", name: "OMSB / MOH", region: "Oman" },
];

export const examProfessions = ["Nurse", "Doctor", "Pharmacist", "Pharmacy Technician", "Physiotherapist", "Medical Laboratory Professional", "Radiographer"];

const common = [
  { question: "Before a procedure, a competent patient says they no longer consent. What is the best immediate action?", options: ["Proceed because consent was signed earlier", "Pause and inform the responsible clinician", "Ask a relative to approve it", "Document refusal after completing it"], answer: 1, explanation: "Valid consent is ongoing and may be withdrawn. Pause, protect the patient and escalate through the clinical team." },
  { question: "You discover that a medication was given to the wrong patient. What should happen first?", options: ["Alter the record", "Assess the patient and escalate immediately", "Wait for symptoms", "Only tell the next shift"], answer: 1, explanation: "Patient assessment and timely escalation come before incident documentation and system learning." },
  { question: "Which action most directly reduces healthcare-associated infection transmission?", options: ["Routine antibiotics", "Correct hand hygiene at the indicated moments", "Double gloving for every task", "Keeping every patient isolated"], answer: 1, explanation: "Appropriate hand hygiene is a core infection-prevention measure; PPE and isolation depend on risk." },
  { question: "A colleague asks you to share a patient's results through a personal messaging account. What is the best response?", options: ["Share only the abnormal values", "Use an approved secure clinical channel", "Send it and delete the chat", "Ask the patient to forward it"], answer: 1, explanation: "Confidential health information should only be shared for a legitimate purpose through approved secure systems." },
];

const professionQuestions = {
  Nurse: [
    { question: "Which finding requires the most urgent nursing escalation?", options: ["Pain score improves from 6 to 3", "New stridor and increasing work of breathing", "Patient requests a blanket", "Scheduled medicine is due in 20 minutes"], answer: 1, explanation: "Airway compromise is an immediate priority. Escalate and initiate the appropriate emergency response." },
    { question: "A deteriorating patient has a falling blood pressure and altered mental status. What is the safest approach?", options: ["Complete routine documentation first", "Use an ABCDE assessment and escalate", "Offer oral fluids without assessment", "Recheck at the end of the shift"], answer: 1, explanation: "A structured ABCDE assessment identifies immediate threats while help is summoned." },
  ],
  Doctor: [
    { question: "A patient develops sudden chest pain, hypotension and hypoxia. What is the best initial approach?", options: ["Wait for a complete history", "Stabilise using ABCDE while investigating urgent causes", "Arrange routine outpatient imaging", "Give discharge advice"], answer: 1, explanation: "Immediate stabilisation and parallel evaluation of life-threatening causes take priority." },
    { question: "When prescribing for renal impairment, the safest first principle is to:", options: ["Use the standard dose automatically", "Review renal function, indication and dose guidance", "Avoid documenting the change", "Ask the patient to choose the dose"], answer: 1, explanation: "Renal function can change drug clearance; verify the indication, current results and trusted dosing guidance." },
  ],
  Pharmacist: [
    { question: "A prescription dose appears ten times higher than usual. What is the best action?", options: ["Dispense because it is signed", "Hold supply and clarify with the prescriber", "Reduce it without telling anyone", "Ask the patient to try one dose"], answer: 1, explanation: "A potentially unsafe dose must be clarified before supply and the intervention documented appropriately." },
    { question: "Which practice best supports safe high-alert medication handling?", options: ["Rely on memory", "Use required independent checks and clear labelling", "Store look-alike products together", "Bypass alerts during busy periods"], answer: 1, explanation: "Independent checks, segregation where needed and clear identification reduce preventable medication harm." },
  ],
  "Pharmacy Technician": [
    { question: "During dispensing, the product strength does not match the prescription. What should you do?", options: ["Change the prescription", "Stop and refer to the pharmacist", "Supply the nearest strength", "Ask the patient to calculate the dose"], answer: 1, explanation: "Technicians should stop the process and refer discrepancies through the pharmacist-led checking pathway." },
    { question: "Which stock practice best reduces expiry-related risk?", options: ["Newest stock first", "First-expiry, first-out with routine date checks", "Mix returned medicines with stock", "Remove batch details"], answer: 1, explanation: "FEFO and documented expiry checks support safe, traceable inventory control." },
  ],
  Physiotherapist: [
    { question: "A patient in rehabilitation develops sudden calf swelling and shortness of breath. What is the best action?", options: ["Continue light exercise", "Stop treatment and seek urgent medical assessment", "Massage the calf", "Book review next week"], answer: 1, explanation: "These are red flags for a possible thromboembolic event and need urgent medical assessment." },
    { question: "Which is the best way to show rehabilitation progress?", options: ["Use only general impressions", "Use appropriate baseline and repeat outcome measures", "Change the goal every visit", "Avoid recording function"], answer: 1, explanation: "Consistent, validated outcome measures help demonstrate change and guide treatment decisions." },
  ],
  "Medical Laboratory Professional": [
    { question: "A specimen label does not match the request details. What is the safest action?", options: ["Relabel it from memory", "Follow rejection or discrepancy procedure", "Run it and correct later", "Remove both identifiers"], answer: 1, explanation: "Patient/specimen identification errors require the approved discrepancy or rejection process." },
    { question: "A critical result is obtained. What should happen?", options: ["Leave it for routine reporting", "Verify as required and communicate via the critical-result policy", "Post it in a group chat", "Delete the first result"], answer: 1, explanation: "Critical values require timely verification, communication and read-back/documentation under policy." },
  ],
  Radiographer: [
    { question: "Before ionising-radiation imaging, which check is fundamental?", options: ["Only the room number", "Correct patient, examination, justification and relevant safety status", "Whether the patient has cash", "The referring clinician's seniority"], answer: 1, explanation: "Identification, correct examination, justification and relevant safety screening are essential before exposure." },
    { question: "ALARA means radiation exposure should be:", options: ["As long as resources allow", "As low as reasonably achievable", "Applied at the same dose to everyone", "Avoided only in children"], answer: 1, explanation: "Optimisation keeps exposure as low as reasonably achievable while obtaining the required diagnostic result." },
  ],
};

export function getExamQuestions(profession) {
  return [...(professionQuestions[profession] || professionQuestions.Nurse), ...common];
}
