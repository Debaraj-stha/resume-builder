import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useLayout } from "../../../provider/layoutProvider";
import LayoutUi from "../layoutUI";
import "../css/google-fonts.css"
import getlayout6OutputSection from "./resume-output/layout6-output";



const ClassicalLayout6 = memo((props) => {
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
  const achievements = props.achievements || liveDetails.achievements
  const skills = props.skills || liveDetails.skills;
  const certificates=props.certificates

  const key_val = {
    personalDetails: personalDetails,
    educations: educations,
    summary: summary,
    experiences: experiences,
    achievements: achievements,
    skills: skills,
    certificates:certificates
  }
  const sectionData = getlayout6OutputSection(key_val)
  const shouldMeasureHeight = props.shouldMeasureHeight || false;
  const { measured, setMeasured, groupSectionsIntoPages,ref } = useLayout()
  const sectionRefs = useRef([])
  const [pages, setPages] = useState([])
  useLayoutEffect(()=>{
    if(shouldMeasureHeight && !measured){
      groupSectionsIntoPages(sectionRefs,setMeasured,setPages)
    }
  },[])

  useEffect(() => {
    if (shouldMeasureHeight) {
      setMeasured(false); // force pagination re-run
    }
  }, [sectionData.length]); 
  



  return (
    <div className="w-full max-w-full" ref={ref}>
      <LayoutUi sectionRefs={sectionRefs} key_val={key_val} pages={pages} layoutId={6} />
    </div>
  );
});

export default ClassicalLayout6;
