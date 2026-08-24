import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiCheckCircle, FiGlobe, FiHeart } from "react-icons/fi";
import { countryGuidance, healthcareRoles } from "../data/healthcareContent";
import "../css/healthcare-tools.css";

export default function HealthcareGuide(){
 const [role,setRole]=useState(Object.keys(healthcareRoles)[0]); const [country,setCountry]=useState(Object.keys(countryGuidance)[0]);
 const data=useMemo(()=>healthcareRoles[role],[role]);
 const countryData=countryGuidance[country] || countryGuidance.Other;
 return <main className="tool-page"><section className="tool-hero"><span>HEALTHCARE CV PLAYBOOK</span><h1>What should your healthcare CV include?</h1><p>Select your profession and target market for practical, role-specific guidance.</p></section><section className="selector-card"><label>Healthcare profession<select value={role} onChange={e=>setRole(e.target.value)}>{Object.keys(healthcareRoles).map(x=><option key={x}>{x}</option>)}</select></label><label>Target country<select value={country} onChange={e=>setCountry(e.target.value)}>{Object.keys(countryGuidance).map(x=><option key={x}>{x}</option>)}</select></label></section><section className="guidance-grid"><article><FiHeart/><h2>Priority competencies</h2><ul>{data.skills.map(x=><li key={x}><FiCheckCircle/>{x}</li>)}</ul></article><article><FiAward/><h2>Credentials to show</h2><ul>{data.credentials.map(x=><li key={x}><FiCheckCircle/>{x}</li>)}</ul></article><article className="country-card"><FiGlobe/><h2>{country} guidance</h2><p>{countryData.note}</p><h3>Relevant authorities</h3><div className="tag-row">{countryData.authorities.map(x=><span key={x}>{x}</span>)}</div><h3>Strong action verbs</h3><div className="tag-row">{data.verbs.map(x=><span key={x}>{x}</span>)}</div></article></section><section className="tool-cta"><div><h2>Ready to apply this guidance?</h2><p>Choose a clean healthcare template and build each section.</p></div><Link to="/templates">Build my CV <FiArrowRight/></Link></section></main>
}
