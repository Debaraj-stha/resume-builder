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
    

    const { liveDetails, compileInput } = useLayout()
    //listening the live values only if entered keyis pressed
    const handleEntered = (e) => {
      if (e.key === "Enter") {
        compileInput()
      }
    };


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
    const industryExpertise = staticProps.industryExpertise || liveDetails.industryExpertise;
    const languages = staticProps.languages || liveDetails.languages;
    const openSourceWork = staticProps.openSourceWork || liveDetails.openSourceWork
    const passions = staticProps.passions || liveDetails.passions
    const awards=staticProps.awards || liveDetails.awards
    const trainings=staticProps.trainings || liveDetails.trainings
    const my_time=staticProps.my_time || liveDetails.my_time
    const key_val = {
      personalDetails,
      educations,
      summary,
      experiences,
      achievements,
      skills,
      strengths,
      certificates,
      industryExpertise,
      languages,
      openSourceWork,
      passions,
      awards,
      trainings,
      my_time

    };

    const sectionData = getSectionDataFn(key_val);

    const sectionRefs = useRef([]);
    const [pages, setPages] = useState([]);
    const { measured, setMeasured, groupSectionsIntoPages, ref } = useLayout();

    useLayoutEffect(() => {
      if (!shouldMeasureHeight || measured) return;

      const refsReady =
        sectionRefs.current.length === sectionData.length &&
        sectionRefs.current.every((ref) => ref && ref.offsetHeight > 0);

      if (refsReady) {
        console.log("All refs ready. Measuring...");
        groupSectionsIntoPages(sectionRefs, setMeasured, setPages);
      } else {
        console.log("Refs not ready. Waiting...");
        const timeout = setTimeout(() => {
          setMeasured(false); // Triggers a re-run
        }, 100); // retry after short delay

        return () => clearTimeout(timeout);
      }
    }, [
      shouldMeasureHeight,
      measured,
      sectionData.length,
      sectionRefs.current.map(ref => ref?.offsetHeight).join(","),
    ]);

    useEffect(() => {
      console.log("called measured in useEffect")
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
