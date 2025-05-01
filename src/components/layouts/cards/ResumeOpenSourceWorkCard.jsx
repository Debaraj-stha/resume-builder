import { BiCalendar } from "react-icons/bi"
import { layout_type_map } from "../../../constant"
import { BorderBox, FlexBox } from "../../CustomComponents"
import { H1, H2, P, Ul } from "../../elements/resumeSectionWrapper"
import { LiaLinkSolid } from "react-icons/lia"

const generateModernOpenSourceWorkCard = ({ works, layout_no, style }) => {
    switch (layout_no) {
        case 2:
            return (
                <>
                    <div>
                        {
                            works.slice(0, 1).map((work, index) => {
                                const { projectName, role, description, link, technologies, date } = work
                                return (
                                    <div key={index}>
                                        <h2 style={{ ...style.h2, textAlign: "left" }}>{projectName}</h2>
                                        <FlexBox margin="0" alignItems="center" gap="5px">
                                            <BiCalendar />
                                            <P style={{ ...style.p }}>{date}</P>
                                        </FlexBox>
                                        <FlexBox margin="0" alignItems="center" gap="5px">
                                            <LiaLinkSolid />
                                            <P style={{ ...style.p }}>{link}</P>
                                        </FlexBox>
                                        <P style={{ ...style.p }}>{description}</P>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            )
        default:
            return (
                <h1>default opensource work</h1>
            )
    }
}
const generateSimpleOpenSourceCard = ({ works, layout_no, style }) => {

    return (
        <>
            {
                works.map((work, index) => {
                    const { projectName, role, description, link, technologies, date } = work
                    return (
                        <>
                            <h2 style={{ ...style.h2 }}>{projectName}</h2>
                            <FlexBox margin="0" justifyContent="space-between">
                                <h3 style={{ ...style.h3 }}>{link}</h3>
                                <p style={{ ...style.p }}>{date}</p>
                            </FlexBox>
                            <p style={{ ...style.p }}>{description}</p>
                            <FlexBox margin="0">
                                {
                                    technologies.map((tech, index) => <BorderBox key={index} color={style.p.color} padding="2px 5px"><p>{tech}</p></BorderBox>)
                                }
                            </FlexBox>
                        </>
                    )
                })
            }

        </>
    )
}
const OpenSourceWorkCard = ({ works, layout_no, layout_type = "modern", style }) => {


        return generateSimpleOpenSourceCard({ works, layout_no, style })
    

}
export default OpenSourceWorkCard