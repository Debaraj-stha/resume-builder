import React from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/Home";
import Templates from "../pages/Templates";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import About from "../pages/About";
import GenerateResume from "../pages/GenerateResume";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFoound";
import DashboardProvider from "../provider/DashboardProvider";
import LayoutWrapper from "./LayoutWrapper";
import { ClassicalLayoutWithProvider, CreativeLayoutWithProvider, ModernLayoutWithProvider, SimpleLayoutWithProvider } from "./LayoutsWithProvider";
import Login from "../pages/Login";
import LayoutProvider from "../provider/layoutProvider";
import RedirectMessagePage from "../pages/RedirectMessagePage";
import Pricing from "../pages/Pricing";
import CoverLetter from "../pages/CoverLetter";
import HealthcareGuide from "../pages/HealthcareGuide";
import ATSChecker from "../pages/ATSChecker";
import AIAssistant from "../pages/AIAssistant";
import CareerCopilot from "../pages/CareerCopilot";
import InterviewCoach from "../pages/InterviewCoach";
import InterviewCoachLanding from "../pages/InterviewCoachLanding";
import HealthcareSeoLanding from "../pages/HealthcareSeoLanding";
import RefundPolicy from "../pages/RefundPolicy";
import { healthcareSeoPages } from "../data/healthcareSeoPages";

const AppRoutes = () => <Routes>
  <Route index path="/" element={<Home />} />
  <Route exact path="/dashboard" element={<DashboardProvider><Dashboard /></DashboardProvider>} />
  <Route exact path="/templates" element={<LayoutWrapper />}><Route index element={<Templates />} /><Route exact path="classical" element={<ClassicalLayoutWithProvider />} /><Route exact path="modern" element={<ModernLayoutWithProvider />} /><Route exact path="simple" element={<SimpleLayoutWithProvider />} /><Route exact path="creative" element={<CreativeLayoutWithProvider />} /></Route>
  <Route exact path="/login" element={<Login />} /><Route exact path="/pricing" element={<Pricing />} /><Route exact path="/cover-letter" element={<CoverLetter />} /><Route exact path="/healthcare-guide" element={<HealthcareGuide />} /><Route exact path="/ats-checker" element={<ATSChecker />} /><Route exact path="/career-copilot" element={<CareerCopilot />} /><Route exact path="/interview-coach" element={<InterviewCoach />} /><Route exact path="/healthcare-interview-coach" element={<InterviewCoachLanding />} />
  <Route exact path="/get-started" element={<Navigate to="/ats-checker" replace />} /><Route exact path="/ai-assistant" element={<AIAssistant />} />
  {Object.keys(healthcareSeoPages).map(path => <Route key={path} exact path={path} element={<HealthcareSeoLanding />} />)}
  <Route exact path="/refund-policy" element={<RefundPolicy />} /><Route exact path="/redirecting" element={<RedirectMessagePage />} /><Route exact path="/contact" element={<Contact />} /><Route exact path="/privacy" element={<Privacy />} /><Route exact path="/about" element={<About />} /><Route exact path="/build-resume/:layout_type/:layout_id" element={<LayoutProvider><GenerateResume /></LayoutProvider>} /><Route path="*" element={<NotFound />} />
</Routes>;
export default AppRoutes;
