import React,{ memo } from "react"
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section,P,H1,Li,SectionContent, Ul } from "../../elements/resumeSectionWrapper";
import { SkillCard,EducationCard,AcheivementCard } from "../cards";
import style from "../classic/style/layout2_style.json"
import common from "./style/common.json"
import { useFormContext } from "react-hook-form";
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
 

    return (
        <div className="mx-2 w-full max-w-full">
        </div>
    )
})
export default ModernLayout2