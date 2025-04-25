
import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";




import getModernLayout1OutputSectionData from "../layout-output/layout-1-output";
import { useLayout } from "../../../../provider/layoutProvider";

import { certificates, industryExpertise, languages } from "../../../../static-data/resume-sample-data";
import LayoutUi from "../../layoutUI";



const ModernLayout1 = memo((props) => {
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
  // const industryExpertise=industryExpertise
  const key_val = {
    personalDetails,
    educations,
    summary,
    experiences,
    achievements,
    skills,
    industryExpertise,
    languages,
    certificates
  }

  const sectionData = getModernLayout1OutputSectionData(key_val)
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
    <div className="w-full max-w-full">
      <LayoutUi sectionRefs={sectionRefs} key_val={key_val} pages={pages} layoutId={1} layout_type="modern" />
    </div>
  );
});

export default ModernLayout1;
