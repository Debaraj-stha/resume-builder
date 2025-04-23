import React, { useLayoutEffect, useRef, useState, useEffect, memo } from "react"
import "../css/google-fonts.css"
import getLayout3OutputSection from "./resume-output/layout3-output";
import { useFormContext } from "react-hook-form";
import { useLayout } from "../../../provider/layoutProvider";
import LayoutUi from "../layoutUI";

const ClassicalLayout3 = memo((props) => {
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
    const shouldMeasureHeight = props.shouldMeasureHeight || false;
    const key_val = {
        personalDetails: personalDetails,
        educations: educations,
        summary: summary,
        experiences: experiences,
        achievements: achievements,
        skills: skills
    }
    const sectionData = getLayout3OutputSection(key_val)
    const { measured, setMeasured, groupSectionsIntoPages, ref } = useLayout()
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
        <div className="mx-2 w-full max-w-full" ref={ref}>
            <LayoutUi sectionRefs={sectionRefs} key_val={key_val} pages={pages} layoutId={3} />
        </div>
    )
})
export default ClassicalLayout3