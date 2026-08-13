import React from "react";
import ClassicalLayout1 from "../components/layouts/classic/layout-1/layout"
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
import { FiArrowRight, FiCheckCircle, FiFileText, FiGrid, FiHeart, FiLayers, FiMic, FiSearch, FiShield, FiTarget, FiZap } from "react-icons/fi";
import { useEffect, useState } from "react";
import { hasDownloadAccess } from "../services/payments";
import "../css/dashboard.css";

const ResumePreview = React.memo(({ closePreviewModal }) => <ScrollableModal onClose={closePreviewModal} header={<Heading>Resume Preview</Heading>}><ClassicalLayout1 /></ScrollableModal>);

const Dashboard = () => {
  const { isModalShow, closePreviewModal, isLoading, isPreviewShow, error, resumes } = useDashboard();
  const { user } = useAuth();
  const [hasPremium, setHasPremium] = useState(false);
  const { PaginationButtons } = usePagination();
  useEffect(() => { if (user?.id) hasDownloadAccess(user.id).then(setHasPremium).catch(() => setHasPremium(false)); }, [user?.id]);
  if (isLoading) return <Loading message="Loading dashboard..." />;
  if (!user) return <Container><Hspace /><div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm"><h1 className="text-3xl font-bold text-slate-900">Your CV workspace</h1><p className="mt-3 text-slate-600">Sign in to save CVs securely and access them from your dashboard.</p><Link className="mt-6 inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white" to="/login?redirectTo=%2Fdashboard">Sign in to continue</Link></div></Container>;
  const firstName = user?.name?.split(" ")?.[0] || user?.email?.split("@")[0] || "there";
  return <div className="dashboard-page"><div className="dashboard-shell">
    <aside className="workspace-sidebar">
      <div className="workspace-label">WORKSPACE</div><Link className="active" to="/dashboard"><FiGrid /> My resumes <span>{resumes.length}</span></Link><Link to="/templates"><FiLayers /> Templates</Link><Link to="/pricing"><FiZap /> Plans & access</Link>
      <div className="sidebar-divider" /><div className="workspace-label">HEALTHCARE TOOLS</div><Link to="/career-copilot"><FiTarget /> Career Copilot</Link><Link to="/interview-coach"><FiMic /> Interview Coach</Link><Link to="/healthcare-guide"><FiHeart /> CV guidance</Link><Link to="/cover-letter"><FiFileText /> Cover letter</Link><Link to="/ats-checker"><FiSearch /> ATS check</Link><Link to="/ai-assistant"><FiZap /> AI assistant</Link>
      <div className="sidebar-plan"><FiShield /><div><span>{hasPremium ? "PREMIUM ACCESS" : "FREE WORKSPACE"}</span><strong>{hasPremium ? "Downloads unlocked" : "Upgrade when ready"}</strong></div></div>
    </aside>
    <main className="workspace-main">
      <section className="dashboard-hero"><div><span>RESUAI HEALTHCARE WORKSPACE</span><h1>Welcome back, {firstName}</h1><p>Build targeted healthcare CVs, check ATS readiness and prepare for every vacancy with AI.</p></div><Link to="/interview-coach" className="hero-create"><FiMic /> Practice an interview</Link></section>
      <section className="dashboard-stats"><article><div className="stat-icon"><FiFileText /></div><div><strong>{resumes.length}</strong><span>Saved resumes</span></div></article><article><div className="stat-icon success"><FiCheckCircle /></div><div><strong>ATS-ready</strong><span>Professional formatting</span></div></article><article><div className="stat-icon premium"><FiZap /></div><div><strong>{hasPremium ? "Premium" : "Free"}</strong><span>{hasPremium ? "PDF access active" : "Create and preview"}</span></div></article></section>
      <section className="career-shortcuts"><Link to="/career-copilot"><div className="shortcut-icon tech"><FiTarget /></div><div><span>AI CAREER COPILOT</span><strong>Match a job and improve your CV</strong><p>Compare your CV with a vacancy, find gaps and create a targeted application.</p></div><FiArrowRight /></Link><Link to="/interview-coach"><div className="shortcut-icon medical"><FiMic /></div><div><span>INTERVIEW READINESS</span><strong>Practice your next healthcare interview</strong><p>Get CV-based questions, answer feedback and an AI-generated practice score.</p></div><FiArrowRight /></Link></section>
      <section className="resume-library"><DashboardHeader />{error && <p className="dashboard-error">{error}</p>}<ResumeTable />{resumes.length > 0 && PaginationButtons}</section>
    </main>
  </div>{isModalShow && <DeleteModal />}{isPreviewShow && <ResumePreview closePreviewModal={closePreviewModal} />}</div>;
};
export default Dashboard;
