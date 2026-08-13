import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle, FiCopy, FiDownload, FiEdit3, FiRefreshCw, FiShield, FiUser, FiZap } from "react-icons/fi";
import { requestAIDraft } from "../services/ai";
import { containsSensitiveIdentifier } from "../utils/healthcareProfile";
import "../css/healthcare-tools.css";
import "../css/ai-assistant.css";

const tasks={
 summary:{label:"Professional summary",hint:"Add experience, speciality, care setting, strongest verified competencies and licence status."},
 experience_bullets:{label:"Employment bullets",hint:"Add employer type, department, duties, systems used and verified outcomes. Include numbers only when known."},
 cover_letter:{label:"Cover letter",hint:"Add the target facility, position, relevant experience, licence status and one genuine achievement."},
 application_email:{label:"Application email",hint:"Add the vacancy, facility, attached documents, availability and preferred contact details."},
 linkedin_about:{label:"LinkedIn About",hint:"Add career direction, speciality, experience, strengths, registration and countries of interest."},
 recruiter_intro:{label:"Recruiter introduction",hint:"Add your profession, years of experience, speciality, licence/eligibility, location and availability."},
 interview_questions:{label:"Interview questions",hint:"Add the target job description and the clinical or behavioural areas you want to practise."},
 career_gap:{label:"Career-gap explanation",hint:"Add the real dates, reason you are comfortable sharing, learning completed and readiness to return."}
};
const readProfile=()=>{try{return JSON.parse(sessionStorage.getItem("healthcare_profile_draft"))||{}}catch{return {}}};

export default function AIAssistant(){
 const [task,setTask]=useState("summary"),[facts,setFacts]=useState(""),[jobDescription,setJobDescription]=useState(""),[draft,setDraft]=useState(""),[state,setState]=useState({loading:false,error:"",message:""});
 const profile=useMemo(readProfile,[]); const hasProfile=Boolean(profile.profession);
 const profileItems=[profile.profession,profile.specialty,profile.experienceLevel,profile.targetPosition,profile.targetCountry,profile.licence?.authority&&(profile.licence.authority+": "+(profile.licence.status||"status not added"))].filter(Boolean);
 const generate=async()=>{setState({loading:false,error:"",message:""});if(task!=="interview_questions"&&!facts.trim())return setState({loading:false,error:"Add your verified facts before creating a draft.",message:""});if(containsSensitiveIdentifier(facts+" "+jobDescription))return setState({loading:false,error:"Remove passport, Aadhaar or other private identification numbers before continuing.",message:""});setState({loading:true,error:"",message:""});try{const result=await requestAIDraft({task,profile:{...profile,licenceStatus:profile.licence?.status},facts:facts.trim(),jobDescription:jobDescription.trim()});setDraft(result.content);setState({loading:false,error:"",message:"Draft created. Review and edit every statement before use."})}catch(error){setState({loading:false,error:error.message,message:""})}};
 const copy=async()=>{await navigator.clipboard.writeText(draft);setState(s=>({...s,message:"Draft copied to clipboard."}))};
 const download=()=>{const file=new Blob([draft],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(file);const anchor=document.createElement("a");anchor.href=url;anchor.download="healthcare-"+task.replaceAll("_","-")+"-draft.txt";anchor.click();URL.revokeObjectURL(url)};
 const clear=()=>{setFacts("");setJobDescription("");setDraft("");setState({loading:false,error:"",message:""})};
 return <main className="tool-page ai-assistant-page">
  <section className="tool-hero"><span>SAFE HEALTHCARE AI ASSISTANCE</span><h1>Create stronger drafts from facts you have verified.</h1><p>Generate healthcare career content adapted to your profession, speciality, destination and vacancy—without inventing clinical experience, licences or metrics.</p></section>
  <section className="ai-profile-bar"><div><FiUser/><span><strong>{hasProfile?"Healthcare profile connected":"No healthcare profile connected"}</strong><small>{hasProfile?profileItems.join(" · "):"Complete onboarding for profession- and country-specific results."}</small></span></div><Link to="/get-started">{hasProfile?"Update profile":"Create profile"}</Link></section>
  <section className="builder-grid"><div className="builder-form ai-form"><div className="ai-form-title"><h2><FiZap/> Draft settings</h2><button type="button" onClick={clear}><FiRefreshCw/>Clear</button></div>
   <label>What do you want to create?<select value={task} onChange={e=>{setTask(e.target.value);setDraft("");setState({loading:false,error:"",message:""})}}>{Object.entries(tasks).map(([key,item])=><option value={key} key={key}>{item.label}</option>)}</select></label>
   <div className="task-hint"><FiCheckCircle/><p><strong>Include verified information such as:</strong> {tasks[task].hint}</p></div>
   <label className="full-field">Your verified facts <span>{facts.length}/20,000</span><textarea maxLength={20000} value={facts} onChange={e=>setFacts(e.target.value)} placeholder={tasks[task].hint}/></label>
   <label className="full-field">Target job description <span>Optional, but recommended</span><textarea maxLength={20000} value={jobDescription} onChange={e=>setJobDescription(e.target.value)} placeholder="Paste the vacancy for role-specific terminology and matching. Remove personal or patient-identifying information."/></label>
   <div className="safety-strip"><FiShield/><p>Do not enter patient names, medical-record numbers, passport/Aadhaar numbers or confidential employer data.</p></div>
   <button type="button" className="continue-button ai-generate" disabled={state.loading} onClick={generate}><FiZap/>{state.loading?"Creating your draft...":"Generate healthcare draft"}</button>
   {state.error&&<p className="form-error" role="alert"><FiAlertCircle/>{state.error}</p>}
  </div>
  <article className="letter-preview ai-preview"><div className="preview-toolbar"><span>EDITABLE DRAFT</span>{draft&&<div><button onClick={copy}><FiCopy/>Copy</button><button onClick={download}><FiDownload/>Download</button></div>}</div>
   {draft?<><textarea aria-label="Editable AI draft" className="ai-output" value={draft} onChange={e=>setDraft(e.target.value)}/><div className="draft-meta"><span>{draft.trim().split(/\s+/).filter(Boolean).length} words</span><span>Edited text is not automatically saved</span></div></>:<div className="empty-draft"><FiEdit3/><h2>Your draft will appear here</h2><p>Select a document type, add verified facts and generate an editable first draft.</p></div>}
   {state.message&&<p className="success-message" role="status"><FiCheckCircle/>{state.message}</p>}
   <p className="quality-note"><FiCheckCircle/>AI output is a draft. Confirm every clinical, licensing and achievement statement before using it.</p>
  </article></section>
 </main>
}
