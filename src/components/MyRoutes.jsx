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
const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/dashboard" element={<h1>Dashboard</h1>}></Route>
            <Route path="/templates" element={<LayoutOnly />}>
                <Route index element={<Templates />} />
                <Route path="classical" element={<ClassicalLayouts/>} />
                <Route path="modern" element={<h1>modern layout</h1>} />
            </Route>

            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/privacy" element={<Privacy />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/build-resume" element={<GenerateResume />}></Route>

        </Routes>
    )

}
export default MyRoutes