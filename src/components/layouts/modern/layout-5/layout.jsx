import React,{ memo, useEffect, useLayoutEffect, useRef, useState } from "react"

import { useFormContext } from "react-hook-form";

import { certificates, industryExpertise, languages, openSourceWork, passions, strengths } from "../../../../static-data/resume-sample-data";

import { useLayout } from "../../../../provider/layoutProvider";

import getModernLayout4OutputSectionData from "../layout-output/layout4-output";
import LayoutUi from "../../layoutUI";



const ModernLayout5 = memo((props) => {
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
         skills,
         strengths,
         languages,
         openSourceWork,
         achievements,
         industryExpertise,
         passions,
         certificates
         
       }  
       const layout_no=5
       const sectionData = getModernLayout4OutputSectionData(key_val,layout_no)
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
                <LayoutUi sectionRefs={sectionRefs} key_val={key_val} pages={pages} layoutId={layout_no} layout_type="modern" />
        </div>
    )
})
export default ModernLayout5