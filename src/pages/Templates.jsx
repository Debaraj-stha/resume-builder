import React from "react";
import ClassicalLayout1 from "../components/layouts/classic/ClassicalLayout1";
import ClassicalLayout2 from "../components/layouts/classic/classicalLayout2";
import { Outlet } from "react-router-dom";
const Templates = () => {
    return (
        <>
        <div className="items-center max-w-7xl mx-auto px-4">

            <h1>Classical Templates</h1>
            <div className="grid grid-cols-1 gap-4">

                <ClassicalLayout1></ClassicalLayout1>
                <ClassicalLayout2></ClassicalLayout2>
            </div>
        </div>
        
        </>
    )
}
export default Templates