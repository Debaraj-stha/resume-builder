import { memo } from "react"
import { layout_type_map } from "../../../constant"
import { H2, H3, IconHolder, InnerContentWrapper, Li, P, Ul } from "../../elements/resumeSectionWrapper"
import { FlexBox } from "../../CustomComponents"
import { BiCalendar } from "react-icons/bi"
import { HiLocationMarker } from "react-icons/hi"
import { LiaMapMarkerSolid } from "react-icons/lia"

const generateClassicalResumeExperienceCard = ({ experience, layout_no }) => {
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
                        <FlexBox margin={style2.experienceCard.FlexCard.margin}>
                            <IconHolder>
                                <BiCalendar></BiCalendar>
                            </IconHolder>
                            <P>{startDate}-{endDate}</P>
                        </FlexBox>
                        <FlexBox>
                            <IconHolder>
                                <HiLocationMarker></HiLocationMarker>
                            </IconHolder>
                            <P>{location}</P>
                        </FlexBox>
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
        case 4:
            return (
                <FlexBox gap="20px">
                    <div style={{ flex: "2" }}>
                        <H3 textAlign="left">{startDate} - {endDate}</H3>
                        <P>{location}</P>
                    </div>
                    <div style={{ flex: "1" }}>
                        <VerticalPinSeparator />
                    </div>
                    <div style={{ flex: "7" }}>
                        <P fontWeight="600" fontFamily="Open sans">{position}</P>
                        <P fontWeight="500">{aboutCompany}</P>
                        <Ul display={style.experienceCard.Ul.display} listStyle="none" textAlign="left" padding="0 0 0 10px">
                            {
                                achievements.map((achievement, index) => (
                                    <Li key={index}>{achievement.value}</Li>
                                ))
                            }
                        </Ul>
                    </div>
                </FlexBox>
            )

        case 5:
            return (
                <div>
                    <div className="flex justify-between">
                        <div>
                            <H2 textAlign="left" fontSize="15px">{position}</H2>
                            <P fontFamily="Open Sans" fontSize="14px">{companyName}</P>
                        </div>
                        <div>
                            <H3 fontWeight="500" fontFamily="Open Sans" textAlign="left">{location}</H3>
                            <P fontFamily="Open Sans" fontSize="14px">{startDate}-{endDate}</P>
                        </div>
                    </div>
                    <P fontFamily="Open Sans" fontSize="14px">{aboutCompany}</P>
                    <Ul display="block">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement.value}</Li>
                            ))
                        }
                    </Ul>
                </div>
            )
        case 6:
            return (
                <div>
                    <div>
                        <H3 textAlign="left">{position}</H3>
                        <P>{companyName}</P>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex gap-2 items-center content-center">
                            <BiCalendar />
                            <P>{startDate}-{endDate}</P>
                        </div>
                        <div className="flex gap-2 items-center content-center">
                            <HiLocationMarker />
                            <P>{location}</P>
                        </div>
                    </div>
                    <Ul display="block">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement.value}</Li>
                            ))
                        }
                    </Ul>
                </div>
            )


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
const generateModernResumeExperienceCard = ({ experience, layout_no }) => {
    const { companyName, position, aboutCompany, achievements, location, startDate, endDate } = experience
    switch (layout_no) {
        case 1:
            console.log("case 1")
            return (
                <>
                    <FlexBox justifyContent="space-between" margin="0">
                        <H3 textAlign="left" fontWeight="500" fontFamily="Lato" fontSize="17px">{position}</H3>
                        <P>{startDate}-{endDate}</P>
                    </FlexBox>
                    <FlexBox justifyContent="space-between" margin="0" >
                        <H3 color="blue" textAlign="left" fontWeight="600">{companyName}</H3>
                        <P>{location}</P>
                    </FlexBox>
                    <P>{aboutCompany}</P>
                    <Ul display="block">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement.value}</Li>
                            ))
                        }
                    </Ul>
                </>
            )
        case 3:
            return (
                <>
                    <H2 fontFamily="'Roboto', sans-serif" color="#0f0771" textAlign="left" fontWeight="normal" fontSize="18px" >
                        {position}</H2>
                    <P color="#0259ff" fontFamily="'Roboto', sans-serif" fontWeight="600" fontSize="14px"
                    >{companyName}</P>
                    <FlexBox margin="0" alignItems="center">
                        <BiCalendar/>
                        <P fontSize="14px" fontFamily="Roboto">{startDate}-{endDate}</P>
                        <LiaMapMarkerSolid/>
                        <P fontSize="14px" fontFamily="Roboto">{location}</P>
                    </FlexBox>
                    <P fontSize="14px" fontFamily="Roboto">{aboutCompany}</P>
                    <Ul display="block">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement.value}</Li>
                            ))
                        }
                    </Ul>
                    {/* 0f0771 */}
                </>
            )
        default:
            return (
                <>
                    <H2 color="#044627" fontFamily="'Raleway', sans-serif" fontWeight="500" textAlign="left">{position}</H2>
                    <FlexBox justifyContent="space-between" margin="0" alignItems="center">
                        <H2 color="#4bdd97" fontSize="16px" fontWeight="normal">{companyName}</H2>
                        <FlexBox margin="0" alignItems="center">
                            <BiCalendar />
                            <P>{startDate}-{endDate}</P>
                        </FlexBox>
                    </FlexBox>
                    <P>{aboutCompany}</P>
                    <Ul display="block">
                        {
                            achievements.map((achievement, index) => (
                                <Li key={index}>{achievement.value}</Li>
                            ))
                        }
                    </Ul>
                </>
            )
    }

}

const ExperienceCard = memo(({ experience, layout_no, layout_type = "classical" }) => {

    // achievements
    const { companyName, position, aboutCompany, achievements, location, startDate, endDate } = experience
    if (layout_type === layout_type_map.CLASSICAL) {
        return generateClassicalResumeExperienceCard({ experience, layout_no })
    }
    if (layout_type === layout_type_map.MODERN) {
        return generateModernResumeExperienceCard({ experience, layout_no })
    }

})
export default ExperienceCard