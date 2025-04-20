import React,{} from "react"
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section,P,H1,Li,SectionContent, Ul } from "../../elements/resumeSectionWrapper";
import { ExperienceCard,SkillCard,EducationCard,AcheivementCard, ResumeHeader } from "../cards";
import style from "./style/layout2_style.json"
import common from "./style/common.json"
const Title=({title})=>{
    return  <H1 fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className.join(" ")}>{title}</H1>
}

const ClassicalLayout2 = (props) => {
    const {
        personalDetails, educations, sumary, experiences, achievements,skills
    } = props

    return (
        <div className="mx-2 w-full max-w-full">
        <ResumeWrapper>

            {/* header section */}
            <Section textAlign={common.Section.textAlign}>
               <ResumeHeader personalDetails={personalDetails} layout_no="2"></ResumeHeader>
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
                            <ExperienceCard key={index} experience={experience} layout_no={2}></ExperienceCard>
                        ))
                    }
                </SectionContent>

            </Section>
            {/* educations Section */}
            <Section marginTop={common.Section.marginTop}>
                <Title title="Education"></Title>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    {
                        educations.map((education, index) => (
                            <EducationCard key={index} education={education} layout_no="2"></EducationCard>
                        ))
                    }
                </SectionContent>
            </Section>
            {/* acheivements Section */}
            {/* <Section>
                <H1 fontSize="25px" fontWeight="600" textAlign="left"  className="pb-1">Acheivements</H1>
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

            </Section> */}
            {/* skills Section */}
            <Section  marginTop={common.Section.marginTop}>
                <Title title="Skills"></Title>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    <SkillCard layout_no="2" skills={skills}></SkillCard>
                </SectionContent>
            </Section>

        </ResumeWrapper>
        
        </div>
    )
}
export default ClassicalLayout2