import React, { useRef, useEffect, useLayoutEffect, useState, memo } from "react";
import { useFormContext } from "react-hook-form";
import { useLayout } from "../../provider/layoutProvider";
import LayoutUi from "./layoutUI";
import "../../components/layouts/css/google-fonts.css";
import { layout_type_map } from "../../constant";

const BaseLayoutRenderer = memo(
  ({
    layoutId,
    getSectionDataFn,
    staticProps = {},
    shouldMeasureHeight,
    layout_type = layout_type_map.CLASSICAL,
  }) => {
    const { getValues } = useFormContext(); 
    const [liveDetails, setLiveDetails] = useState({});
    //listening the live values only if entered keyis pressed
    const handleEntered = (e) => {
      if (e.key === "Enter") {
        const values = getValues();
        setLiveDetails(values);
      }
    };

    // Initial state setup
    useEffect(() => {
      setLiveDetails(getValues());
    }, []);

    //attach event listener
    useEffect(() => {
      window.addEventListener("keyup", handleEntered);
      return () => {
        window.removeEventListener("keyup", handleEntered);
      };
    }, []);

    // Merge live form values with any static props passed in
    const personalDetails = staticProps.personalDetails || liveDetails.personalDetails;
    const educations = staticProps.educations || liveDetails.educations;
    const summary = staticProps.summary || liveDetails.summary;
    const experiences = staticProps.experiences || liveDetails.experiences;
    const achievements = staticProps.achievements || liveDetails.achievements;
    const skills = staticProps.skills || liveDetails.skills;
    const strengths = staticProps.strengths || liveDetails.strengths;
    const certificates = staticProps.certificates || liveDetails.certificates;

    const key_val = {
      personalDetails,
      educations,
      summary,
      experiences,
      achievements,
      skills,
      strengths,
      certificates,
    };

    const sectionData = getSectionDataFn(key_val);
    const sectionRefs = useRef([]);
    const [pages, setPages] = useState([]);
    const { measured, setMeasured, groupSectionsIntoPages, ref } = useLayout();

    useLayoutEffect(() => {
      if (shouldMeasureHeight && !measured) {
        sectionRefs.current = new Array(sectionData.length).fill(null);
        groupSectionsIntoPages(sectionRefs, setMeasured, setPages);
      }
    }, [shouldMeasureHeight, measured, sectionData.length]);

    useEffect(() => {
      if (shouldMeasureHeight) {
        setMeasured(false);
      }
    }, [sectionData.length]);

    return (
      <div className="w-full max-w-full" ref={ref}>
        <LayoutUi
          sectionRefs={sectionRefs}
          key_val={key_val}
          pages={pages}
          layoutId={layoutId}
          layout_type={layout_type}
        />
      </div>
    );
  }
);

export default BaseLayoutRenderer;
