import React, { useEffect, useState } from "react";
import ClassicalLayout1 from "../components/layouts/classic/layout-1/layout";
import ScrollableModal from "../components/ScrollableModal";
import DashboardHeader from "../components/DashboardHeader";
import ResumeTable from "../components/ResumeTable";
import DeleteModal from "../components/DeleteModal";
import Container from "../components/Container";
import { useDashboard } from "../provider/DashboardProvider";
import { usePagination } from "../provider/paginationProvider";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { hasDownloadAccess } from "../services/payments";
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiFileText, FiGlobe, FiGrid, FiHeart, FiLayers, FiMic, FiSearch, FiShield, FiTarget, FiZap, FiPlus, FiChevronRight } from "react-icons/fi";
import "../css/dashboard.css";
import { TESTING_ACCESS_ENABLED } from "../config/testingAccess";

const ResumePreview = React.memo(({ closePreviewModal }) => <ScrollableModal onClose={closePreviewModal} header="Resume Preview"><ClassicalLayout1 /></ScrollableModal>);

const Dashboard = () => {
  const { isModalShow, closePreviewModal, isLoading, isPreviewShow, error, resumes = [] } = useDashboard();
  const { user } = useAuth();
  const [hasPremium, setHasPremium] = useState(false);
  const { PaginationButtons } = usePagination();
  useEffect(() => { if (user?.id) hasDownloadAccess(user.id).then(setHasPremium).catch(() => setHasPremium(false)); }, [user?.id]);

  if (isLoading) return <Loading message="Loading dashboard..." />;
  if (!user) return <Container><div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm"><h1 className="text-3xl font-bold text-slate-900">Your CV workspace</h1><p className="mt-3 text-slate-600">Sign in to save CVs securely and access them from your dashboard.</p><Link className="mt-6 inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white" to="/login?redirectTo=%2Fdashboard">Sign in to continue</Link></div></Container>;

  const firstName = user?.name?.split(" ")?.[0] || user?.email?.split("@")[0] || "there";
  return <div className="dashboard-page">
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <div className="brand-mark"><div className="brand-symbol">R</div><div><strong>ResuAIBuilder</strong><span>Healthcare Career OS</span></div></div>
        <div className="workspace-label">WORKSPACE</div>
        <Link className="active" to="/dashboard"><FiGrid /> My resumes <span>{resumes.length}</span></Link>
        <Link to="/templates"><FiLayers /> Templates</Link>
        <Link to="/pricing"><FiZap /> Plans & access</Link>
        <div className="sidebar-divider" />
        <div className="workspace-label">CAREER TOOLS</div>
        <Link to="/career-copilot"><FiTarget /> Career Copilot</Link>
        <Link to="/credential-readiness"><FiGlobe /> Country Readiness</Link>
        <Link to="/ats-checker"><FiSearch /> AI CV & ATS</Link>
        <Link to="/licensing-exam-prep"><FiBookOpen /> Licensing Exam Prep</Link>
        <Link to="/interview-coach"><FiMic /> AI Interview Coach</Link>
        <Link to="/practice-questions"><FiCheckCircle /> Practice Questions</Link>
        <Link to="/healthcare-guide"><FiHeart /> Healthcare CV Guide</Link>
        <Link to="/cover-letter"><FiFileText /> Cover Letter</Link>
        <div className="sidebar-bottom"><FiShield /><div><span>{TESTING_ACCESS_ENABLED ? "TESTING ACCESS" : hasPremium ? "PREMIUM ACCESS" : "FREE WORKSPACE"}</span><strong>{TESTING_ACCESS_ENABLED || hasPremium ? "All features unlocked" : "Upgrade when ready"}</strong></div></div>
      </aside>

      <main className="workspace-main">
        <header className="workspace-topbar"><div><span>MY WORKSPACE</span><strong>Career dashboard</strong></div><div className="top-actions"><Link to="/practice-questions">Practice</Link><Link to="/pricing">Upgrade</Link></div></header>
        <section className="welcome-row"><div><span className="eyebrow">YOUR HEALTHCARE CAREER WORKSPACE</span><h1>Good to see you, {firstName}.</h1><p>Everything you need to build, improve and practise for your next healthcare opportunity.</p></div><Link className="primary-cta" to="/ats-checker"><FiPlus /> Improve my CV</Link></section>
        <section className="workspace-grid">
          <article className="readiness-card"><div className="readiness-head"><div><span className="eyebrow">CAREER READINESS</span><h2>Keep your application moving</h2><p>Start with your CV, then use AI to prepare for the role.</p></div><div className="readiness-ring"><strong>{resumes.length ? "CV" : "0"}</strong><span>{resumes.length ? "created" : "start"}</span></div></div><div className="readiness-steps"><Link to="/ats-checker"><span className="step-dot done"><FiCheckCircle /></span><div><strong>CV foundation</strong><small>{resumes.length ? "Your workspace has a saved CV" : "Create your first healthcare CV"}</small></div><FiChevronRight /></Link><Link to="/ats-checker"><span className="step-dot"><FiSearch /></span><div><strong>ATS optimisation</strong><small>Check keywords, structure and improvement opportunities</small></div><FiChevronRight /></Link><Link to="/interview-coach"><span className="step-dot"><FiMic /></span><div><strong>Interview practice</strong><small>Practise with an AI healthcare interviewer</small></div><FiChevronRight /></Link></div></article>
          <article className="quick-start-card"><span className="eyebrow">QUICK START</span><h2>What do you want to do?</h2><p>Jump straight into the tool you need.</p><div className="quick-links"><Link to="/ats-checker"><FiSearch /><div><strong>Check my ATS score</strong><small>Upload your CV</small></div><FiArrowRight /></Link><Link to="/career-copilot"><FiTarget /><div><strong>Improve for a job</strong><small>Match CV to a vacancy</small></div><FiArrowRight /></Link><Link to="/interview-coach"><FiMic /><div><strong>Practise interview</strong><small>Start an AI mock interview</small></div><FiArrowRight /></Link></div></article>
        </section>
        <section className="tool-section"><div className="section-heading"><div><span className="eyebrow">CAREER TOOLKIT</span><h2>Build, optimise, practise</h2></div><Link to="/healthcare-guide">Explore guidance <FiArrowRight /></Link></div><div className="tool-grid"><Link to="/credential-readiness" className="tool-card featured"><div className="tool-icon"><FiGlobe /></div><div><span>GLOBAL CAREER READINESS</span><h3>Credential & Country Readiness</h3><p>Check licensing evidence, documents and next steps for your destination.</p></div><FiArrowRight /></Link><Link to="/ats-checker" className="tool-card"><div className="tool-icon"><FiSearch /></div><div><span>CV INTELLIGENCE</span><h3>AI CV & ATS</h3><p>Upload once, check your score and improve your CV in one guided flow.</p></div><FiArrowRight /></Link><Link to="/licensing-exam-prep" className="tool-card"><div className="tool-icon"><FiBookOpen /></div><div><span>LICENSING PRACTICE</span><h3>DHA, DOH & GCC Exam Prep</h3><p>Take scored profession-specific practice tests with explanations.</p></div><FiArrowRight /></Link><Link to="/career-copilot" className="tool-card"><div className="tool-icon"><FiTarget /></div><div><span>AI CAREER COPILOT</span><h3>Target a vacancy</h3><p>Compare your CV with a job and close the gaps.</p></div><FiArrowRight /></Link><Link to="/interview-coach" className="tool-card"><div className="tool-icon"><FiMic /></div><div><span>AI INTERVIEW</span><h3>Mock interview</h3><p>Answer realistic healthcare questions and get feedback.</p></div><FiArrowRight /></Link></div></section>
        <section className="resume-library"><div className="section-heading library-title"><div><span className="eyebrow">YOUR DOCUMENTS</span><h2>My resumes</h2><p>Create, preview and manage your saved CVs.</p></div></div><DashboardHeader />{error && <p className="dashboard-error">{error}</p>}<ResumeTable />{resumes.length > 0 && PaginationButtons}</section>
      </main>
    </div>
    {isModalShow && <DeleteModal />}{isPreviewShow && <ResumePreview closePreviewModal={closePreviewModal} />}
  </div>;
};
export default Dashboard;
