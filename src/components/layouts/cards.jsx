import React, { useState, useEffect } from "react"
import { InnerContentWrapper, P, H1, H2, H3, Li, FlexCard, IconHolder, Ul } from "../elements/resumeSectionWrapper"
import { skills } from "../../sttaic-data/resume-sample-data"
import { BiCalendar, BiMobile } from "react-icons/bi"
import { FaMarker } from "react-icons/fa"
import { HiLocationMarker } from "react-icons/hi"
import { MdEmail } from "react-icons/md"
import { LiaLinkedin } from "react-icons/lia"


export const ResumeHeader = ({ personalDetails, layout_no }) => {
    switch (layout_no) {
        case "2":
            return (
                <>
                    <H1 fontSize="40px" fontWeight="600" textAlign="left">{personalDetails.name}</H1>
                    <H1 fontWeight="500" fontSize="20px" color='blue' textAlign="left">{personalDetails.profession}</H1>
                    <Ul justifyContent="start" listStyle="none">
                        <Li display="flex" justifyContent="space-between" alignItems="center">
                            <IconHolder>
                                <BiMobile color="blue"></BiMobile>
                            </IconHolder>
                            {personalDetails.phone}</Li>
                        <Li display="flex" justifyContent="space-between" alignItems="center">
                            <IconHolder>
                                <MdEmail color="blue"></MdEmail>
                            </IconHolder>
                            {personalDetails.email}</Li>
                        <Li display="flex" justifyContent="space-between" alignItems="center">
                            <IconHolder>
                                <LiaLinkedin color="blue"></LiaLinkedin>
                            </IconHolder>
                            {personalDetails.linkedin}/</Li>
                    </Ul>
                    <P className="font-normal">{personalDetails.address}</P>
                </>
            )
        default:
            return (
                <>
                    <H1 fontSize="40px" fontWeight="700">{personalDetails.name}</H1>
                    <H1 fontWeight="500" fontSize="25px" >{personalDetails.profession}</H1>
                    <Ul>
                        <Li>{personalDetails.phone}</Li>
                        <Li>{personalDetails.email}</Li>
                        <Li>{personalDetails.linkedin}/</Li>
                    </Ul>
                    <P  textAlign="center">{personalDetails.address}</P>
                </>

            )

    }

}
export const ExperienceCard = ({ experience, layout_no }) => {
    const { companyName, position, aboutCompany, achievements } = experience
    switch (layout_no) {
        case 2:
            return (
                <div className="text-left pb-4">
                    <InnerContentWrapper>
                        <H2 color="blue">{position}</H2>
                    </InnerContentWrapper>
                    <InnerContentWrapper>
                        <H3>{companyName}</H3>

                    </InnerContentWrapper>
                    <InnerContentWrapper justifyContent="start">
                        <FlexCard margin="0 10px 0 0">
                            <IconHolder>
                                <BiCalendar></BiCalendar>
                            </IconHolder>
                            <P>2023-present</P>
                        </FlexCard>
                        <FlexCard>
                            <IconHolder>
                                <HiLocationMarker></HiLocationMarker>
                            </IconHolder>
                            <P>Binartnagar-6,Morang</P>
                        </FlexCard>
                    </InnerContentWrapper>

                    <P>{aboutCompany}</P>
                    <ul className="list-disc list-inside">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement}</Li>
                            ))
                        }
                    </ul>
                </div>
            )

        default:
            return <div className="text-left pb-4">
                <InnerContentWrapper>
                    <H2>{companyName}</H2>
                    <H3>Dharan</H3>
                </InnerContentWrapper>
                <InnerContentWrapper>
                    <H3>{position}</H3>
                    <P>2020-2023</P>
                </InnerContentWrapper>
                <P>{aboutCompany}</P>
                <ul className="list-disc list-inside">
                    {
                        achievements.map((achievement, index) => (
                            <Li key={index}>{achievement}</Li>
                        ))
                    }
                </ul>
            </div>
    }

}
export const EducationCard = ({ education, layout_no }) => {
    const { university, degree, start_finish } = education
    switch (layout_no) {
        case "2":
            return (
                <div className="">
                    <div className="text-left">
                        <H3 textAlign="left">{degree}</H3>
                        <P color="blue" fontWeight="bold">{university}</P>
                    </div>
                    <FlexCard>
                        <IconHolder>
                            <BiCalendar></BiCalendar>
                        </IconHolder>
                        <P textAlign="right">{start_finish}</P>
                    </FlexCard>
                </div>

            )
        default:
            return (
                <div className="grid grid-cols-2 gap-2">
                    <div className="text-left">
                        <H3 textAlign="left">{university}</H3>
                        <P fontWeight="600">{degree}</P>
                    </div>
                    <div className="text-right">
                        <P textAlign="right">{start_finish}</P>
                    </div>
                </div>

            )

    }


}
export const AcheivementCard = ({ my_acheivement }) => {
    const { achievement, field, date } = my_acheivement
    return (
        <div>
            <H3 textAlign="left">{achievement}</H3>
            <P>{field} {date}</P>
        </div>
    )
}
export const SkillCard = ({layout_no}) => {
   
    switch(layout_no){
        case "2":
            return (
                <div className="grid grid-cols-6 gap-4">
                {skills.map((skill, index) =>
                  skill.items.map((item, i) => (
                    <div key={`${index}-${i}`} className="text-left">{item}</div>
                  ))
                )}
              </div>
              
            )
        default:
            const [skillItems, setSkillItem] = useState([])
            useEffect(() => {
                let items = []
                skills.forEach((skill) => {
                    items.push(skill.items)
                })
                setSkillItem(items)
            }, [])

            return (
                <div>
                    <P>{skillItems.join(",")}</P>
                </div>
            )

    }

   
}