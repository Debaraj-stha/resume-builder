import React, { useEffect } from "react";
import { Hspace } from "../components/CustomComponents";
import InPageLayoutLinks from "../components/InPageLayoutLinks";
import AllLayouts from "../components/AllTemplates";
import ClassicalLayouts from "../components/ClassicalLayouts";
import ModernLayouts from "../components/ModernLayouts";
import SimpleLayouts from "../components/SimpleLayouts";
import CreativeLayouts from "../components/CreativeLayouts";


const Templates = () => {
    useEffect(()=>{
        const gridItems=document.querySelectorAll(".templates")
        const handleScroll = () => {
            gridItems.forEach((item) => {
              const boundingRect = item.getBoundingClientRect().top;
              if (boundingRect < window.innerHeight - 100) {
                  item.classList.add("animate");
                }
            });
          };
        
          handleScroll(); // run once on mount
          window.addEventListener("scroll", handleScroll);       
          return () => window.removeEventListener("scroll", handleScroll);
    },[])
    return (
        <>
            <Hspace></Hspace>
            <div className="items-center max-w-7xl mx-auto px-4">
                {/* link */}
                <InPageLayoutLinks/>
                {/* all resume section */}
                <AllLayouts/>
                {/* classical resume templates */}
               <ClassicalLayouts></ClassicalLayouts>
                {/* modern resume templates */}
               <ModernLayouts></ModernLayouts>
                {/* simple resume templates */}
                <SimpleLayouts></SimpleLayouts>
                {/* creative resume templates */}
                <CreativeLayouts></CreativeLayouts>
                
            </div>

        </>
    )
}
export default Templates