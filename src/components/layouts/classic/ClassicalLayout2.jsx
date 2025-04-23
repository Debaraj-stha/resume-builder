import React, { useRef,useEffect,useState,useLayoutEffect, memo } from "react"
import { useFormContext } from "react-hook-form";
import getLayout2OutputSectionData from "./resume-output/layout2-output";
import { useLayout } from "../../../provider/layoutProvider";
import LayoutUi from "../layoutUI";


const ClassicalLayout2 = memo((props) => {
  const sectionRefs = useRef([])
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
  const skills = props.skills || liveDetails.skills;
  const key_val = {
    personalDetails: personalDetails,
    educations: educations,
    summary: summary,
    experiences: experiences,
    achievements: achievements,
    skills: skills
  }
  const sectionData = getLayout2OutputSectionData(key_val)
  const { measured, setMeasured, groupSectionsIntoPages, ref } = useLayout()
  const shouldMeasureHeight = props.shouldMeasureHeight || false;
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
    <div className="w-full max-w-full" ref={ref}>
      <LayoutUi sectionRefs={sectionRefs} key_val={key_val} pages={pages} layoutId={2} />
    </div>
  );
});

export default ClassicalLayout2;
