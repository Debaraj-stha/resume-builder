import React from "react";
import { Route, Routes } from "react-router-dom"

import Home from "../pages/Home";
import Templates from "../pages/Templates";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import About from "../pages/About";
import GenerateResume from "../pages/GenerateResume";

import ClassicalLayouts from "../pages/ClassicalLayouts";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFoound";
import DashboardProvider from "../provider/DashboardProvider";
import LayoutWrapper from "./LayoutWrapper";
const MyRoutes = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home></Home>}></Route>
            <Route exact path="/dashboard" element={
                <DashboardProvider>
                    <Dashboard />
                </DashboardProvider>}></Route>
            <Route exact path="/templates" element={<LayoutWrapper />}>
                <Route index element={<Templates />} />
                <Route exact path="classical" element={<ClassicalLayouts />} />
                <Route exact path="modern" element={<h1>modern layout</h1>} />
            </Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/privacy" element={<Privacy />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/build-resume/:layout_type/:layout_id" element={<GenerateResume />}></Route>
            <Route path="*" element={<NotFound />}></Route>


        </Routes>
    )

}
export default MyRoutes