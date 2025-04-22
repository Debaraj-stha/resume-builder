import React, { useState, useEffect } from "react"
import { InnerContentWrapper, P, H1, H2, H3, Li, FlexCard, IconHolder, Ul, SkillCardWrapper, SkillCardItemsWrapper } from "../elements/resumeSectionWrapper"
import { skills } from "../../static-data/resume-sample-data"
import { BiCalendar, BiMobile } from "react-icons/bi"
import { FaMarker } from "react-icons/fa"
import { HiLocationMarker } from "react-icons/hi"
import { MdEmail } from "react-icons/md"
import { LiaLinkedin } from "react-icons/lia"
import style from "./classic/style/layout1_style.json"
import style2 from "./classic/style/layout2_style.json"
import style3 from "./classic/style/layout3_style.json"
import { BsGithub, BsGlobe } from "react-icons/bs"

const GenerateLi = ({ icon, text }) => {
    return (
        <Li display={style2.ResumeHeader.li.display} justifyContent={style2.ResumeHeader.li.justifyContent} alignItems={style2.ResumeHeader.li.alignItems} >
            <IconHolder>
                {icon}
            </IconHolder>
            <span>
                {text}
            </span>
        </Li>
    )
}
export const ResumeHeader = ({ personalDetails, layout_no }) => {
    console.log("layout_no", layout_no)
    // console.log("personalDetails", personalDetails)
    switch (layout_no) {
        case 2:
            return (
                <>
                    <H1 fontSize={style2.ResumeHeader.name.fontSize} fontWeight={style2.ResumeHeader.name.fontWeight} textAlign={style2.ResumeHeader.name.textAlign}>{personalDetails.name}</H1>
                    <H1 fontWeight={style2.ResumeHeader.profession.fontWeight} fontSize={style2.ResumeHeader.profession.fontSize} color={style2.ResumeHeader.profession.color} textAlign={style2.ResumeHeader.profession.textAlign}>{personalDetails.profession}</H1>
                    <Ul justifyContent={style2.ResumeHeader.ul.justifyContent} listStyle={style2.ResumeHeader.ul.listStyle}>
                        <GenerateLi icon={<BiMobile color="blue"></BiMobile>} text={personalDetails.phone}></GenerateLi>
                        <GenerateLi icon={<MdEmail color="blue"></MdEmail>} text={personalDetails.email}></GenerateLi>

                        {personalDetails.urls.map((u, index) => {
                            if (u.includes("linkedin")) {
                                return (
                                    <GenerateLi key={index} icon={<LiaLinkedin color="blue"></LiaLinkedin>} text={u}></GenerateLi>
                                )
                            }
                            else if (u.includes("github")) {
                                return (
                                    <GenerateLi key={index} icon={<BsGithub color="blue"></BsGithub>} text={u}></GenerateLi>
                                )
                            }
                            else {
                                return (
                                    <GenerateLi key={index} icon={<BsGlobe color="blue"></BsGlobe>} text={u}></GenerateLi>
                                )
                            }
                        }
                        )}
                        {/* <GenerateLi icon={<LiaLinkedin color="blue"></LiaLinkedin>} text={personalDetails.linkedin}></GenerateLi> */}
                    </Ul>
                    <P className={style2.ResumeHeader.p.className.join(" ")}>{personalDetails.address}</P>
                </>
            )
        case 3:
            return (
                <>
                    <H1 fontSize={style3.ResumeHeader.name.fontSize} fontWeight={style2.ResumeHeader.name.fontWeight} fontFamily={style3.ResumeHeader.name.fontFamily} >{personalDetails.name}</H1>
                    <H1 fontWeight={style3.ResumeHeader.profession.fontWeight} fontSize={style3.ResumeHeader.profession.fontSize} color={style3.ResumeHeader.profession.color} fontFamily={style3.ResumeHeader.profession.fontFamily}>{personalDetails.profession}</H1>
                    <Ul display="flex" listStyle={style2.ResumeHeader.ul.listStyle}>
                        <Li>{personalDetails.phone}</Li>
                        <Li>{personalDetails.email}</Li>
                        <Li>{personalDetails.github}/</Li>
                    </Ul>
                    <P textAlign={style.ResumeHeader.address.textAlign}>{personalDetails.address}</P>
                </>
            )
        default:
            return (
                <>
                    <H1 fontSize={style.ResumeHeader.name.fontSize} fontWeight={style.ResumeHeader.name.fontWeight}>{personalDetails.name}</H1>
                    <H1 fontWeight={style.ResumeHeader.profession.fontWeight} fontSize={style.ResumeHeader.profession.fontSize}>{personalDetails.profession}</H1>
                    <Ul>
                        <Li>{personalDetails.phone}</Li>
                        <Li>{personalDetails.email}</Li>
                        {personalDetails.urls.map((u, index) => (
                            <Li key={index}>{u}</Li>
                        ))}
                    </Ul>
                    <P textAlign={style.ResumeHeader.address.textAlign}>{personalDetails.address}</P>
                </>

            )

    }

}
export const ExperienceCard = ({ experience, layout_no }) => {
    // achievements
    const { companyName, position, aboutCompany, achievements, location, startDate, endDate } = experience
    switch (layout_no) {
        case 2:
            return (
                <div className={style2.experienceCard.div.className.join(" ")}>
                    <InnerContentWrapper>
                        <H2 color={style2.experienceCard.h2.color}>{position}</H2>
                    </InnerContentWrapper>
                    <InnerContentWrapper>
                        <H3>{companyName}</H3>

                    </InnerContentWrapper>
                    <InnerContentWrapper justifyContent={style2.experienceCard.InnerContentWrapper.justifyContent}>
                        <FlexCard margin={style2.experienceCard.FlexCard.margin}>
                            <IconHolder>
                                <BiCalendar></BiCalendar>
                            </IconHolder>
                            <P>{startDate}-{endDate}</P>
                        </FlexCard>
                        <FlexCard>
                            <IconHolder>
                                <HiLocationMarker></HiLocationMarker>
                            </IconHolder>
                            <P>{location}</P>
                        </FlexCard>
                    </InnerContentWrapper>

                    <P>{aboutCompany}</P>
                    <Ul display={style2.experienceCard.ul.display} listStylePosition="outside">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement.value}</Li>
                            ))
                        }
                    </Ul>
                </div>
            )
        case 3:
            return <div className={style3.experienceCard.div.className.join(" ")}>
                <InnerContentWrapper>
                    <H2 color={style3.experienceCard.h2.color}>{companyName}</H2>
                    <H3>{location}</H3>
                </InnerContentWrapper>
                <InnerContentWrapper>
                    <H3>{position}</H3>
                    <P>{startDate}-{endDate}</P>
                </InnerContentWrapper>
                <P>{aboutCompany}</P>
                <Ul display={style.experienceCard.Ul.display} listStylePosition="outside">
                    {
                        achievements.map((achievement, index) => (
                            <Li key={index}>{achievement.value}</Li>
                        ))
                    }
                </Ul>
            </div>


        default:
            return <div className="text-left pb-4">
                <InnerContentWrapper>
                    <H2>{companyName}</H2>
                    <H3>{location}</H3>
                </InnerContentWrapper>
                <InnerContentWrapper>
                    <H3>{position}</H3>
                    <P>{startDate}-{endDate}</P>
                </InnerContentWrapper>
                <P>{aboutCompany}</P>
                <Ul display={style.experienceCard.Ul.display} listStylePosition="outside">
                    {
                        achievements.map((achievement, index) => {

                            return (

                                <Li key={index}>{achievement.value}</Li>

                            )
                        })

                    }
                </Ul>
            </div>
    }

}
export const EducationCard = ({ education, layout_no }) => {
    const { university, degree, start_complete } = education

    switch (layout_no) {
        case 2:
            return (
                <div>
                    <div className={style2.educationCard.innerDiv.className.join(" ")}>
                        <H3 textAlign={style2.educationCard.innerDiv.h3.textAlign}>{degree}</H3>
                        <P color={style2.educationCard.innerDiv.p.color} fontWeight={style2.educationCard.innerDiv.p.fontWeight}>{university}</P>
                    </div>
                    <FlexCard>
                        <IconHolder>
                            <BiCalendar></BiCalendar>
                        </IconHolder>
                        <P textAlign={style2.educationCard.p.textAlign}>{start_complete}</P>
                    </FlexCard>
                </div>

            )
        case 3:
            return (
                <div className={style3.EducationCard.outerDiv.className.join(" ")}>
                    <div className={style3.EducationCard.firstDiv.className.join(" ")}>
                        <H3 textAlign={style3.EducationCard.firstDiv.h3.textAlign} color={style3.EducationCard.firstDiv.h3.color}>{university}</H3>
                        <P>{degree}</P>
                    </div>
                    <div className={style3.EducationCard.secondDiv.className.join(" ")}>
                        <P textAlign={style3.EducationCard.secondDiv.p}>{start_complete}</P>
                    </div>
                </div>

            )
        default:
            return (
                <div className={style.educationCard.div.outer.className.join(" ")}>
                    <div className={style.educationCard.div.first.className.join(" ")}>
                        <H3 textAlign={style.educationCard.h3.textAlign}>{university}</H3>
                        <P>{degree}</P>
                    </div>
                    <div className={style.educationCard.div.second.className.join(" ")}>
                        <P textAlign={style.educationCard.p.textAlign}>{start_complete}</P>
                    </div>
                </div>

            )

    }


}
export const AcheivementCard = ({ my_acheivement }) => {
    const { acheivement, field, date } = my_acheivement


    return (
        <div>
            <H3 textAlign={style.AcheivementCard.h3.textAlign}>{acheivement}</H3>
            <P>{field} {date}</P>
        </div>
    )
}

const ClassicalSkillcardCase3 = ({ skills }) => {
    return (
        <div>
            {skills.map((skill, index) => (
                <SkillCardWrapper key={index}>
                    <P>{skill.field}:</P>
                    <SkillCardItemsWrapper className="">
                        {skill.items.map((item, i) => (
                            <P key={i}>{item}</P>
                        ))}
                    </SkillCardItemsWrapper>
                </SkillCardWrapper>
            ))}
        </div>
    );
};

export const SkillCard = ({ skills, layout_no }) => {

    switch (layout_no) {
        case 2:
            return (
                <div className={style2.SkillCard.div.className.join(" ")}>
                    {skills.map((skill, index) =>
                        skill.items.map((item, i) => (
                            <P key={`${index}-${i}`} className={style2.SkillCard.p.className.join | (" ")}>{item}</P>
                        ))
                    )}
                </div>

            )
        case 3:
            return <ClassicalSkillcardCase3 skills={skills} />

        default:


            return (
                <div>
                    <P>

                        {
                            skills.map((skill, index) => (
                                <span key={index}>{skill.items.join(" ")}</span>
                            ))
                        }
                    </P>
                </div>
            )

    }


}