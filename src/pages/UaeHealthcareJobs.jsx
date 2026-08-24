import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiBriefcase, FiClock, FiExternalLink, FiMapPin, FiRefreshCw, FiSearch, FiShield } from "react-icons/fi";
import "../css/uae-healthcare-jobs.css";

const roles = [
  ["all", "All healthcare roles"], ["nurse", "Registered Nurse"], ["doctor", "Doctor / Physician"],
  ["pharmacist", "Pharmacist"], ["dentist", "Dentist"], ["physiotherapist", "Physiotherapist"],
  ["laboratory", "Medical Laboratory"], ["radiographer", "Radiographer"], ["coder", "Medical Coder"],
  ["assistant", "Healthcare Assistant"],
];
const locations = [
  ["uae", "All UAE"], ["dubai", "Dubai"], ["abu-dhabi", "Abu Dhabi"], ["sharjah", "Sharjah"],
  ["ajman", "Ajman"], ["al-ain", "Al Ain"], ["ras-al-khaimah", "Ras Al Khaimah"], ["fujairah", "Fujairah"],
];

const formatDate = (value) => {
  if (!value) return "Recently listed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently listed";
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  return days === 0 ? "Posted today" : days === 1 ? "Posted yesterday" : `Posted ${days} days ago`;
};

export default function UaeHealthcareJobs() {
  const [role, setRole] = useState("all");
  const [location, setLocation] = useState("uae");
  const [search, setSearch] = useState({ role: "all", location: "uae" });
  const [state, setState] = useState({ loading: true, jobs: [], error: "" });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true, error: "" }));
    fetch(`/api/job-match?role=${search.role}&location=${search.location}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load jobs.");
        setState({ loading: false, jobs: data.jobs || [], error: "" });
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState({ loading: false, jobs: [], error: error.message });
      });
    return () => controller.abort();
  }, [search]);

  const submit = (event) => { event.preventDefault(); setSearch({ role, location }); };
  return <main className="jobs-page">
    <section className="jobs-hero">
      <span>LIVE UAE HEALTHCARE OPPORTUNITIES</span>
      <h1>Find the right UAE healthcare role—and prepare a stronger application.</h1>
      <p>Search current opportunities for nurses, doctors, pharmacists and allied health professionals, then tailor your CV before applying on the original job website.</p>
      <div className="jobs-trust"><span><FiShield/> Your API key stays protected</span><span><FiBriefcase/> Direct application links</span><span><FiClock/> Results refreshed regularly</span></div>
    </section>

    <form className="jobs-search-card" onSubmit={submit}>
      <label>Healthcare profession<select value={role} onChange={(event) => setRole(event.target.value)}>{roles.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label>Preferred UAE location<select value={location} onChange={(event) => setLocation(event.target.value)}>{locations.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <button type="submit"><FiSearch/> Search jobs</button>
    </form>

    <section className="jobs-results" aria-live="polite">
      <header><div><span>SEARCH RESULTS · FILTERED FOR UAE RELEVANCE</span><h2>{state.loading ? "Finding opportunities…" : `${state.jobs.length} opportunities found`}</h2></div><p>Always verify the vacancy, recruiter and licensing requirements before sharing documents or making any payment.</p></header>
      {state.loading ? <div className="jobs-status"><FiRefreshCw className="spin"/><h3>Searching trusted job sources</h3><p>This usually takes a few seconds.</p></div> : state.error ? <div className="jobs-status error"><FiAlertCircle/><h3>Jobs could not be loaded</h3><p>{state.error}</p><button onClick={() => setSearch({ ...search })}>Try again</button></div> : state.jobs.length === 0 ? <div className="jobs-status"><FiSearch/><h3>No matching jobs found</h3><p>Try All UAE or another healthcare profession.</p></div> : <div className="jobs-grid">{state.jobs.map((job, index) => <article className="job-card" key={job.id || `${job.title}-${index}`}>
        <div className="job-card-top">{job.employerLogo ? <img src={job.employerLogo} alt="" loading="lazy" referrerPolicy="no-referrer"/> : <span className="job-logo"><FiBriefcase/></span>}<div><small>{job.employmentType || "Healthcare opportunity"}</small><h3>{job.title}</h3><strong>{job.employer}</strong></div></div>
        <div className="job-meta"><span><FiMapPin/>{job.location || [job.city, job.state, job.country].filter(Boolean).join(", ") || "United Arab Emirates"}</span><span><FiClock/>{formatDate(job.postedAt)}</span></div>
        <p>{job.description ? `${job.description.slice(0, 240)}${job.description.length > 240 ? "…" : ""}` : "Open the original listing to review responsibilities and eligibility requirements."}</p>
        <div className="job-actions"><Link to="/career-copilot">Match my CV <FiArrowRight/></Link><a href={job.applyUrl} target="_blank" rel="noopener noreferrer nofollow">View & apply <FiExternalLink/></a></div>
        {job.publisher && <small className="job-source">Source: {job.publisher}</small>}
      </article>)}</div>}
    </section>
    <section className="jobs-application-cta"><div><span>BEFORE YOU APPLY</span><h2>Match your healthcare CV to the vacancy.</h2><p>Identify missing keywords and tailor your CV using only your true qualifications and experience.</p></div><Link to="/career-copilot">Check my CV match <FiArrowRight/></Link></section>
  </main>;
}
