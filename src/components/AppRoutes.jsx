import React from "react";
import { Route, Routes } from "react-router-dom"

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
import RefundPolicy from "../pages/RefundPolicy";
import CoverLetter from "../pages/CoverLetter";
import HealthcareGuide from "../pages/HealthcareGuide";
import ATSChecker from "../pages/ATSChecker";
import HealthcareOnboarding from "../pages/HealthcareOnboarding";
import AIAssistant from "../pages/AIAssistant";
import Terms from "../pages/Terms";
import ChatGPTIntegration from "../pages/ChatGPTIntegration";


const AppRoutes = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home></Home>}></Route>
            <Route exact path="/dashboard" element={
                <DashboardProvider>
                    <Dashboard />
                </DashboardProvider>}></Route>
            <Route exact path="/templates" element={<LayoutWrapper />}>
                <Route index element={<Templates />} />
                <Route exact path="classical" element={<ClassicalLayoutWithProvider />} />
                <Route exact path="modern" element={<ModernLayoutWithProvider />} />
                <Route exact path="simple" element={<SimpleLayoutWithProvider />} />
                <Route exact path="creative" element={<CreativeLayoutWithProvider />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/cover-letter" element={<CoverLetter />} />
            <Route exact path="/healthcare-guide" element={<HealthcareGuide />} />
            <Route exact path="/ats-checker" element={<ATSChecker />} />
            <Route exact path="/get-started" element={<HealthcareOnboarding />} />
            <Route exact path="/ai-assistant" element={<AIAssistant />} />
            <Route exact path="/refund-policy" element={<RefundPolicy />} />
            <Route exact path="/terms" element={<Terms />} />
            <Route exact path="/chatgpt-integration" element={<ChatGPTIntegration />} />
            <Route exact path="/redirecting" element={<RedirectMessagePage />} />
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/privacy" element={<Privacy />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/build-resume/:layout_type/:layout_id" element={
                <LayoutProvider> <GenerateResume />  </LayoutProvider>
            }></Route>
            
            <Route path="*" element={<NotFound />}></Route>


        </Routes>
    )

}
export default AppRoutes
