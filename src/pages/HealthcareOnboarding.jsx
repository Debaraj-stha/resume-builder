import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiArrowRight, FiCheck, FiShield } from "react-icons/fi";
import { countryGuidance, cvTypes, experienceLevels, healthcareRoles, licenceStatuses } from "../data/healthcareContent";
import { containsSensitiveIdentifier, safeProfile } from "../utils/healthcareProfile";
import "../css/healthcare-tools.css";
import "../css/onboarding.css";

const initial = { profession:"", specialty:"", experienceLevel:"", targetCountry:"", targetPosition:"", cvType:"Two-page ATS healthcare CV", licence:{ type:"", authority:"", status:"Not started", eligibilityStatus:"", dataflowStatus:"", examinationStatus:"", issueDate:"", expiryDate:"", verificationStatus:"" }, jobDescription:"" };

export default function HealthcareOnboarding(){
  const [data,setData]=useState(initial); const [error,setError]=useState(""); const [step,setStep]=useState(1); const navigate=useNavigate();
  const config=healthcareRoles[data.profession]; const countries=Object.keys(countryGuidance);
  const set=(key,value)=>setData(p=>({...p,[key]:value}));
  const setLicence=(key,value)=>setData(p=>({...p,licence:{...p.licence,[key]:value}}));
  const authorities=useMemo(()=>countryGuidance[data.targetCountry]?.authorities||[],[data.targetCountry]);
  const next=()=>{ if(step===1&&(!data.profession||!data.specialty||!data.experienceLevel)) return setError("Complete profession, speciality and experience level."); if(step===2&&(!data.targetCountry||!data.targetPosition)) return setError("Complete target country and position."); setError(""); setStep(x=>Math.min(3,x+1)); };
  const finish=()=>{ const result=safeProfile(data); if(!result.success) return setError(result.error.issues[0]?.message); if(containsSensitiveIdentifier(data.jobDescription)) return setError("Please remove passport, Aadhaar or other private identification numbers."); sessionStorage.setItem("healthcare_profile_draft",JSON.stringify(result.data)); navigate("/templates"); };

  return <main className="tool-page onboarding-page">
    <section className="tool-hero"><span>CREATE YOUR HEALTHCARE PROFILE</span><h1>Build the right CV for your profession and destination.</h1><p>Your selections control the structure, prompts, licensing guidance and ATS checks.</p></section>
    <div className="onboarding-progress">{["Professional background","Target application","Licence & vacancy"].map((x,i)=><span className={step>=i+1?"active":""} key={x}><b>{step>i+1?<FiCheck/>:i+1}</b>{x}</span>)}</div>
    <section className="onboarding-card">
      {step===1&&<div className="onboarding-fields"><h2>Tell us about your healthcare background</h2>
        <label>Profession<select value={data.profession} onChange={e=>{set("profession",e.target.value);set("specialty","")}}><option value="">Select profession</option>{Object.keys(healthcareRoles).map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Clinical speciality<select disabled={!config} title={!config ? "Select a profession first." : "Select clinical speciality"} value={data.specialty} onChange={e=>set("specialty",e.target.value)}><option value="">Select speciality</option>{config?.specialties.map(x=><option key={x}>{x}</option>)}</select>{!config&&<small className="control-reason">Select a profession first to see relevant specialities.</small>}</label>
        <label>Experience level<select value={data.experienceLevel} onChange={e=>set("experienceLevel",e.target.value)}><option value="">Select experience</option>{experienceLevels.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>CV type<select value={data.cvType} onChange={e=>set("cvType",e.target.value)}>{cvTypes.map(x=><option key={x}>{x}</option>)}</select></label>
      </div>}
      {step===2&&<div className="onboarding-fields"><h2>Define your target application</h2>
        <label>Destination country<select value={data.targetCountry} onChange={e=>{set("targetCountry",e.target.value);setLicence("authority","")}}><option value="">Select country</option>{countries.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Target position<input value={data.targetPosition} onChange={e=>set("targetPosition",e.target.value)} placeholder={config?.titles?.[0]||"Target position"}/></label>
        <label>Regulatory authority<select value={data.licence.authority} onChange={e=>setLicence("authority",e.target.value)}><option value="">Select authority</option>{authorities.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Registration status<select value={data.licence.status} onChange={e=>setLicence("status",e.target.value)}>{licenceStatuses.map(x=><option key={x}>{x}</option>)}</select></label>
      </div>}
      {step===3&&<div className="onboarding-fields"><h2>Add licence and vacancy context</h2>
        <label>Licence / registration type<input value={data.licence.type} onChange={e=>setLicence("type",e.target.value)} placeholder="e.g. Registered Nurse licence"/></label>
        <label>Eligibility / DataFlow status<input value={data.licence.dataflowStatus} onChange={e=>setLicence("dataflowStatus",e.target.value)} placeholder="e.g. DataFlow verified"/></label>
        <label>Issue date<input type="date" value={data.licence.issueDate} onChange={e=>setLicence("issueDate",e.target.value)}/></label>
        <label>Expiry date<input type="date" value={data.licence.expiryDate} onChange={e=>setLicence("expiryDate",e.target.value)}/></label>
        <label className="full-field">Job description (optional)<textarea value={data.jobDescription} onChange={e=>set("jobDescription",e.target.value)} placeholder="Paste the vacancy text for tailored keywords and matching."/></label>
        <div className="privacy-warning"><FiShield/><p><strong>Protect sensitive information.</strong> Do not enter patient names, passport/Aadhaar numbers or full private document numbers. Verify all generated clinical statements.</p></div>
      </div>}
      {error&&<p className="form-error"><FiAlertTriangle/>{error}</p>}
      <div className="onboarding-actions">{step>1&&<button className="back-button" onClick={()=>setStep(x=>x-1)}>Back</button>}<button className="continue-button" onClick={step===3?finish:next}>{step===3?"Continue to templates":"Continue"}<FiArrowRight/></button></div>
    </section>
  </main>;
}
