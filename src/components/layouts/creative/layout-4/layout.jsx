import React,{ memo, useEffect, useLayoutEffect, useRef, useState } from "react"

import { useFormContext } from "react-hook-form";
import LayoutUi from "../../layoutUI";
import {  languages,  passions, strengths } from "../../../../static-data/resume-sample-data";

import { useLayout } from "../../../../provider/layoutProvider";
import getCreativeLayout4OuctputSectionData from "../layout-output/layout-4-output";





const CreativeLayout4 = memo((props) => {
   const {
       watch
     } = useFormContext();
   
     // Watch live values from form context
     const liveDetails = watch();
   
     // Use props if they exist, else fall back to live form values
     const personalDetails = props.personalDetails || liveDetails.personalDetails;
     const educations = props.educations || liveDetails.educations;
     const summary = props.summary || liveDetails.summary;
     const experiences = props.experiences || liveDetails.experiences;
     const achievements = props.achievements || liveDetails.acheivements;
     const skills = props.skills||liveDetails.skills;
    const key_val = {
         personalDetails,
         educations,
         summary,
         experiences,
    
         strengths,
         languages,
         achievements,
      
         passions
       } 
       const layout_id=4
       const sectionData = getCreativeLayout4OuctputSectionData(key_val,layout_id)
       const shouldMeasureHeight = props.shouldMeasureHeight || false;
       const { measured, setMeasured, groupSectionsIntoPages, ref } = useLayout()
         const sectionRefs = useRef([])
       const [pages, setPages] = useState([])
       useLayoutEffect(() => {
         if (shouldMeasureHeight && !measured) {
           groupSectionsIntoPages(sectionRefs, setMeasured, setPages)
         }
       }, [])
     
       useEffect(() => {
         if (shouldMeasureHeight) {
           setMeasured(false); // force pagination re-run
         }
       }, [sectionData.length]);

    return (
        <div className="mx-2 w-full max-w-full">
                <LayoutUi sectionRefs={sectionRefs} key_val={key_val} pages={pages} layoutId={layout_id} layout_type="creative" />
        </div>
    )
})
export default CreativeLayout4