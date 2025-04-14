import React,{} from "react"
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section,P,H1,Li,SectionContent, Ul } from "../../elements/resumeSectionWrapper";
import { personalDetails, sumary ,achievements,educations,experiences} from "../../../sttaic-data/resume-sample-data";
import { ExperienceCard,SkillCard,EducationCard,AcheivementCard, ResumeHeader } from "../cards";
import { BiMobile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { GiChainMail } from "react-icons/gi";
import { LiaLinkedin } from "react-icons/lia";
import style from  "./layout2_style.json"

const ClassicalLayout2 = (props) => {
console.log(style)
    return (
        <div className="mx-2 w-full max-w-full">
        <ResumeWrapper>

            {/* header section */}
            <Section textAlign="left">
               <ResumeHeader personalDetails={personalDetails} layout_no="2"></ResumeHeader>
            </Section>
            {/* summary section */}
            <Section marginTop="15px">
                <H1 fontSize="25px" fontWeight="600" textAlign="left" className="pb-1">Summary</H1>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    <P>
                        {sumary}
                    </P>
                </SectionContent>
            </Section>
            {/* experience section */}
            <Section marginTop="15px">
                <H1 fontSize="25px" fontWeight="600"textAlign="left"   className="pb-1">Experience</H1>
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
            <Section marginTop="15px">
                <H1 fontSize="25px" fontWeight="600"textAlign="left"   className="pb-1">Education</H1>
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
            <Section  marginTop="15px">
                <H1 fontSize="25px" fontWeight="600" textAlign="left"  className="pb-1">Skills</H1>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    <SkillCard layout_no="2"></SkillCard>
                </SectionContent>
            </Section>

        </ResumeWrapper>
        
        </div>
    )
}
export default ClassicalLayout2