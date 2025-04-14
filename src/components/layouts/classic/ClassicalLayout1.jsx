import React,{} from "react"
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section,P,H1,Li,SectionContent, Ul } from "../../elements/resumeSectionWrapper";
import { personalDetails, sumary ,achievements,educations,experiences} from "../../../sttaic-data/resume-sample-data";
import { ExperienceCard,SkillCard,EducationCard,AcheivementCard, ResumeHeader } from "../cards";
import style from  "./style/layout1_style.json"
import common from "./style/common.json"
const Title=({title})=>{
    return  <H1 fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className}>{title}</H1>

}
const ClassicalLayout1 = (props) => {

    return (
        <div className="mx-2 w-full  max-w-full">
        <ResumeWrapper>

            {/* header section */}
            <Section>
               <ResumeHeader personalDetails={personalDetails}></ResumeHeader>
            </Section>
            {/* summary section */}
            <Section marginTop={common.Section.marginTop}>
                <Title title="Summary"></Title>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    <P>
                        {sumary}
                    </P>
                </SectionContent>
            </Section>
            {/* experience section */}
            <Section marginTop={common.Section.marginTop}>
                 <Title title="Experience"></Title>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    {
                        experiences.map((experience, index) => (
                            <ExperienceCard key={index} experience={experience}></ExperienceCard>
                        ))
                    }
                </SectionContent>

            </Section>
            {/* educations Section */}
            <Section>
                 <Title title="Education"></Title>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    {
                        educations.map((education, index) => (
                            <EducationCard key={index} education={education}></EducationCard>
                        ))
                    }
                </SectionContent>
            </Section>
            {/* acheivements Section */}
            <Section  marginTop={common.Section.marginTop}>
                 <Title title="Acheivements"></Title>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    <div className="grid grid-cols-2 gap-2">

                        {
                            achievements.map((acheivement, index) => (
                                <AcheivementCard key={index} my_acheivement={acheivement}></AcheivementCard>
                            ))
                        }
                    </div>
                </SectionContent>

            </Section>
            {/* skills Section */}
            <Section  marginTop={common.Section.marginTop}>
                 <Title title="Skills"></Title>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    <SkillCard></SkillCard>
                </SectionContent>
            </Section>

        </ResumeWrapper>
        
        </div>
    )
}
export default ClassicalLayout1