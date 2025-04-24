import React,{ memo, useEffect, useLayoutEffect, useRef, useState } from "react"
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section,P,H1,Li,SectionContent, Ul } from "../../elements/resumeSectionWrapper";

import style from "../classic/style/layout2_style.json"
import common from "./style/common.json"
import { useFormContext } from "react-hook-form";
import LayoutUi from "../layoutUI";
import { certificates, industryExpertise, languages, openSourceWork } from "../../../static-data/resume-sample-data";
import getModernLayout2OutputSectionData from "./layout-output/layout2-output";
import { useLayout } from "../../../provider/layoutProvider";
const Title=({title})=>{
    return  <H1 fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className.join(" ")}>{title}</H1>
}

const ModernLayout2 = memo((props) => {
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
         achievements,
         skills,
         industryExpertise,
         languages,
         certificates,
         openSourceWork
       }  
       const sectionData = getModernLayout2OutputSectionData(key_val)
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
                <LayoutUi sectionRefs={sectionRefs} key_val={key_val} pages={pages} layoutId={2} layout_type="modern" />
        </div>
    )
})
export default ModernLayout2