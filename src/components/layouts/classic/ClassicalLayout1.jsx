import React,{} from "react"
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section,P,H1,Li,SectionContent, Ul } from "../../elements/resumeSectionWrapper";
import { personalDetails, sumary ,achievements,educations,experiences} from "../../../sttaic-data/resume-sample-data";
import { ExperienceCard,SkillCard,EducationCard,AcheivementCard, ResumeHeader } from "../cards";

const ClassicalLayout1 = (props) => {

    return (
        <div className="mx-2 w-full  max-w-full">
        <ResumeWrapper>

            {/* header section */}
            <Section>
               <ResumeHeader personalDetails={personalDetails}></ResumeHeader>
            </Section>
            {/* summary section */}
            <Section marginTop="15px">
                <H1 fontSize="25px" fontWeight="500" className="pb-1">Summary</H1>
                <TransparentLine></TransparentLine>
                <SectionContent>
                    <P>
                        {sumary}
                    </P>
                </SectionContent>
            </Section>
            {/* experience section */}
            <Section marginTop="15px">
                <H1 fontSize="25px" fontWeight="500" className="pb-1">Experience</H1>
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
                <H1 fontSize="25px" fontWeight="500" className="pb-1">Education</H1>
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
            <Section  marginTop="15px">
                <H1 fontSize="25px" fontWeight="500" className="pb-1">Acheivements</H1>
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
            <Section  marginTop="15px">
                <H1 fontSize="25px" fontWeight="500" className="pb-1">Skills</H1>
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