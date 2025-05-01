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
import { ClassicalLayoutWithProvider, CreativeLayoutWithProvider, ModernLayoutWithProvider } from "./LayoutsWithProvider";


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
                <Route exact path="modern" element={<ModernLayoutWithProvider/>} />
                <Route exact path="simple" element={<h1>simple layout</h1>} />
                <Route exact path="creative" element={<CreativeLayoutWithProvider/>} />
            </Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/privacy" element={<Privacy />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/build-resume/:layout_type/:layout_id" element={<GenerateResume />}></Route>
            <Route path="*" element={<NotFound />}></Route>


        </Routes>
    )

}
export default AppRoutes