import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Login";
import Home from "../pages/Home";
import Templates from "../pages/Templates";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import About from "../pages/About";
import GenerateResume from "../pages/GenerateResume";
import LayoutOnly from "./LayouotOnly";
import ClassicalLayouts from "../pages/ClassicalLayouts";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFoound";
import DashboardProvider from "../provider/DashboardProvider";
const MyRoutes = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home></Home>}></Route>
            <Route exact path="/dashboard" element={
                <DashboardProvider>
                    <Dashboard />
                </DashboardProvider>}></Route>
            <Route exact path="/templates" element={<LayoutOnly />}>
                <Route index element={<Templates />} />
                <Route exact path="classical" element={<ClassicalLayouts />} />
                <Route exact path="modern" element={<h1>modern layout</h1>} />
            </Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/privacy" element={<Privacy />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/build-resume" element={<GenerateResume />}></Route>
            <Route path="*" element={<NotFound />}></Route>


        </Routes>
    )

}
export default MyRoutes