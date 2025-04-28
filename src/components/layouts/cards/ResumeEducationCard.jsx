import { memo } from "react"
import { H1, H2, H3, IconHolder, P } from "../../elements/resumeSectionWrapper"
import { FlexBox, VerticalPinSeparator } from "../../CustomComponents"
import { BiCalendar } from "react-icons/bi"




const generateSimpleEducationCard = ({ education, layout_no, style, props }) => {
    const { degree, university, start_complete, address } = education
    console.log(props)
    const { swapPosition, applyFlex, shouldIncludeIcon,applyVerticalDivider } = props
    console.log("swap position",swapPosition)
    if (applyVerticalDivider) {
        return (
            <FlexBox gap="20px">
                <div style={{ flex: "2" }}>
                    <H3 textAlign="left">{start_complete}</H3>
                </div>
                <div style={{ flex: "1" }}>
                    <VerticalPinSeparator />
                </div>
                <div style={{ flex: "7" }}>
                    <P fontWeight="600" fontFamily="Open sans">{degree}</P>
                    <P fontWeight="500">{university}</P>
                    <P fontWeight="400" fontSize="14px">GPA 3.8</P>
                </div>
            </FlexBox>
        )
    }

    return (
        <>
            {
                swapPosition ?
                    <h3 style={{ ...style.sectionSubHeader }}>{university}</h3>
                    : <h2 style={{ ...style.h3 }}>{degree}</h2>
            }
            {
                applyFlex ? (
                    <FlexBox margin="0" justifyContent="space-between" alignItems="center">
                        {
                            swapPosition ?
                                 <h2 style={{ ...style.h3 }}>{degree}</h2>
                                : <h3 style={{ ...style.sectionSubHeader }}>{university}</h3>
                        }
                        <FlexBox margin="0" alignItems="center">
                            {shouldIncludeIcon && <BiCalendar />}
                            <p style={{ ...style.p }}>{start_complete}</p>
                        </FlexBox>
                    </FlexBox>
                ) :
                    (
                        <>
                            {
                                    swapPosition ?
                                    <h2 style={{ ...style.h3 }}>{degree}</h2>
                                    : <h2 style={{ ...style.sectionSubHeader }}>{university}</h2>

                            }
                            <FlexBox margin="0" alignItems="center">
                                <BiCalendar />
                                <p style={{ ...style.p }}>{start_complete}</p>
                            </FlexBox>
                        </>
                    )
            }

        </>
    )
}
const EducationCard = memo(({ education, layout_no, layout_type = "classical", style, ...props }) => {

    console.log("should apply flex", props)

    return generateSimpleEducationCard({ education, layout_no, style, props })

})
export default EducationCard