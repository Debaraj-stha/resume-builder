import { memo } from "react"
import { Li, P, Ul } from "../../elements/resumeSectionWrapper"
import { FlexBox, VerticalPinSeparator } from "../../CustomComponents"

import { LiaMapMarkerSolid } from "react-icons/lia"
import { CgCalendar } from "react-icons/cg"


const generateSimpleResumeExperienceCard = ({ experience, layout_no, style, props }) => {
    console.log("simple experience card called")
    const { position, startDate, endDate, companyName, aboutCompany, location, achievements } = experience
    const {
        applyFlex,
        includeDateAndAddress,
        includeAddrss,
        includeDate,
        swapPosition,
        applyVerticalDivider } = props
    if (applyVerticalDivider) {
        return (
            <FlexBox gap="20px">
                <div style={{ flex: "2" }}>
                    <h3 style={{ ...style.h3 }}>{startDate}-{endDate}</h3>
                    <P>{location}</P>
                </div>
                <div style={{ flex: "1" }}>
                    <VerticalPinSeparator />
                </div>
                <div style={{ flex: "7" }}>
                    <P fontWeight="600" fontFamily="Open sans">{position}</P>
                    <P fontWeight="500">{aboutCompany}</P>
                    <Ul listStyle="none" textAlign="left" padding="0 0 0 10px">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement.value}</Li>
                            ))
                        }
                    </Ul>
                </div>
            </FlexBox>
        )
    }

    return (
        <>
            <div className="mb-3">




                {/* When applyFlex is true and includeDateAndAddress is true */}

                <FlexBox margin="0" justifyContent="space-between"  {...(applyFlex) ? { display: "flex" } : { display: "block" }}>
                    <FlexBox  display= "block" alignItems="center" margin="0">
                        {
                            //awap position of elemenet based on flag
                            swapPosition ?
                                (
                                    <>
                                        <h3 style={{ ...style.sectionSubHeader }}>{companyName}</h3>
                                        <h3 style={{ ...style.h3 }}>{position}</h3>
                                    </>
                                ) : (
                                    <>
                                        <h3 style={{ ...style.h3 }}>{position}</h3>
                                        <h3 style={{ ...style.sectionSubHeader }}>{companyName}</h3>
                                    </>
                                )
                        }
                    </FlexBox>
                    {applyFlex && (
                        <FlexBox margin="0" alignItems="center">
                            {
                                includeDate && <P style={{ ...style.p }}>{startDate} - {endDate}</P>

                            }
                            {
                                includeAddrss && <P style={{ ...style.p }}>{location}</P>
                            }
                            {
                                includeDateAndAddress && (<div>
                                    <P style={{ ...style.p }}>{location}</P>
                                    <P style={{ ...style.p }}>{startDate} - {endDate}</P>
                                </div>)
                            }
                        </FlexBox>
                    )}
                </FlexBox>


                {/* When applyFlex is false */}
                {!applyFlex && (
                    <>
                        <FlexBox margin="0">
                            <FlexBox justifyContent='space-between' margin="0">
                                <LiaMapMarkerSolid />
                                <P style={{ ...style.p }}> {location}</P>
                            </FlexBox>
                            <FlexBox margin="0">
                                <CgCalendar />
                                <P style={{ ...style.p }}>{startDate} - {endDate}</P>
                            </FlexBox>
                        </FlexBox>
                    </>
                )}

                {/* About Company */}
                <P style={{ ...style.p }}>{aboutCompany}</P>

                {/* Achievements */}
                <Ul display="block" margin="0">
                    {achievements.map((achievement, index) => (
                        <Li key={index} style={{ ...style.p }}>{achievement.value}</Li>
                    ))}
                </Ul>
            </div>
        </>
    )
}


const ExperienceCard = memo(({ experience, layout_no, style, layout_type = "classical", ...props }) => {

    console.log("props", props)
    return generateSimpleResumeExperienceCard({ experience, layout_no, style, props })


})
export default ExperienceCard

/*
 if (layout_no === 6) {
        return (
            <FlexBox gap="20px">
                <div style={{ flex: "2" }}>
                    <h3 style={{ ...style.h3 }}>{startDate}-{endDate}</h3>
                    <h2 style={{ ...style.h2 }}>{location}</h2>

                </div>
                <div style={{ flex: "1" }}>
                    <VerticalPinSeparator />
                </div>
                <div style={{ flex: "7" }}>
                    <h2 style={{ ...style.h2 }}>{position}</h2>
                    <h3 style={{ ...style.h3 }}>{companyName}</h3>
                    <p style={{ ...style.p }}>{aboutCompany}</p>

                    {
                        <Ul display="block">
                            {
                                achievements.map((achievement, index) => (
                                    <Li key={index}>{achievement.value}</Li>
                                ))
                            }
                        </Ul>
                    }

                </div>
            </FlexBox>
        )
    }*/