import { memo } from "react"
import { H1, H2, H3, IconHolder, P } from "../../elements/resumeSectionWrapper"
import { FlexBox, VerticalPinSeparator } from "../../CustomComponents"
import { BiCalendar } from "react-icons/bi"
import { CgCalendar } from "react-icons/cg"
//styles
import style from "../classic/style/layout1_style.json"
import style2 from "../classic/style/layout2_style.json"
import style3 from "../classic/style/layout3_style.json"
import { layout_type_map } from "../../../constant"
import { LiaMapMarkerSolid } from "react-icons/lia"

const generateClassicalEducationCard = ({ education, layout_no }) => {
    const { university, degree, start_complete } = education

    switch (layout_no) {
        case 2:
            return (
                <div>
                    <div className={style2.educationCard.innerDiv.className.join(" ")}>
                        <H3 textAlign={style2.educationCard.innerDiv.h3.textAlign}>{degree}</H3>
                        <P color={style2.educationCard.innerDiv.p.color} fontWeight={style2.educationCard.innerDiv.p.fontWeight}>{university}</P>
                    </div>
                    <FlexBox>
                        <IconHolder>
                            <BiCalendar></BiCalendar>
                        </IconHolder>
                        <P textAlign={style2.educationCard.p.textAlign}>{start_complete}</P>
                    </FlexBox>
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
        case 4:
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
        case 5:
            return (
                <div className="flex justify-between">
                    <div className="">
                        <H2 textAlign="left" fontSize="15px">{degree}</H2>
                        <P fontFamily="Open Sans" fontSize="14px">{university}</P>
                    </div>
                    <div>
                        <P fontFamily="Open Sans" fontSize="14px">{start_complete}</P>
                    </div>
                </div>
            )
        case 6:
            return (
                <div>
                    <H3 textAlign="left" >{degree}</H3>
                    <H3 fontWeight="500" textAlign="left">{university}</H3>
                    <div className="flex gap-2 items-center content-center">
                        <CgCalendar></CgCalendar>
                        <span>{start_complete}</span>
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
const generateModernEducationCard = ({ education, layout_no }) => {
    const { degree, university, start_complete, address } = education
    switch (layout_no) {
        case 1:
            return (
                <div>
                    <H2 color="white" fontSize="18px">{degree}</H2>
                    <P color="#eee3e3">{university}</P>
                    <P color="#eee3e3">{start_complete}</P>
                </div>
            )
        case 2:
            return (
                <>
                    <H2 fontFamily="'Raleway', sans-serif" color="#044627" textAlign="left" fontWeight="normal" fontSize="18px" >{degree}</H2>
                    <H2 color="#4bdd97" fontFamily="'Raleway', sans-serif" fontWeight="600" textAlign="left" fontSize="16px">{university}</H2>
                    <div className="flex gap-2 items-center content-center">
                        <BiCalendar />
                        <P>{start_complete}</P>
                    </div>

                </>
            )

        case 3:
            return (
                <>
                    <H2 fontFamily="'Roboto', sans-serif" color="#0f0771" textAlign="left" fontWeight="normal" fontSize="18px" >{degree}</H2>
                    <P color="#0259ff" fontFamily="'Roboto', sans-serif" fontWeight="600" fontSize="14px"
                     >{university}</P>
                    <div className="flex gap-2 items-center content-center">
                        <BiCalendar />
                        <P fontSize="14px">{start_complete}</P>
                        <LiaMapMarkerSolid />
                        <P fontSize="14px">{address}</P>
                    </div>

                </>
            )

    }
}
const EducationCard = memo(({ education, layout_no, layout_type = "classical" }) => {
    if (layout_type === layout_type_map.CLASSICAL) {
        return generateClassicalEducationCard({ education, layout_no })
    }
    if (layout_type === layout_type_map.MODERN) {
        return generateModernEducationCard({ education, layout_no })
    }

})
export default EducationCard