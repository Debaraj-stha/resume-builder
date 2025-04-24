import { BiCalendar } from "react-icons/bi"
import { layout_type_map } from "../../../constant"
import { FlexBox } from "../../CustomComponents"
import { H1, H2, P } from "../../elements/resumeSectionWrapper"
import { LiaLinkSolid } from "react-icons/lia"

const generateModernOpenSourceWorkCard = ({ works, layout_no }) => {
    const { projectName, role } = works
    switch (layout_no) {
        case 2:
            // projectName: "Node.js",
            // role: "Issue Triage & Feedback",
            // description: "Provided detailed feedback on open issues and tested bug fixes related to event loop and asynchronous operations.",
            // technologies: ["Node.js", "JavaScript", "GitHub"],
            // link: "https://github.com/nodejs/node/issues/9876",
            // date: "2024-01
            return (
                <>
                    <div>
                        {
                            works.slice(0,1).map((work, index) => {
                                const { projectName, role, description, link, technologies, date } = work
                                return (
                                    <div key={index}>
                                        <H2 H2 color="#044627" fontFamily="'Raleway', sans-serif" fontWeight="500" textAlign="left">{projectName}</H2>
                                        <FlexBox margin="0" alignItems="center" gap="5px">
                                            <BiCalendar />
                                            <P>{date}</P>
                                        </FlexBox>
                                        <FlexBox  margin="0" alignItems="center" gap="5px">
                                            <LiaLinkSolid/>
                                            <P  fontSize="12px">{link}</P>
                                        </FlexBox>
                                        <P fontSize="12px">{description}</P>
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
const OpenSourceWorkCard = ({ works, layout_no, layout_type = "modern" }) => {
    if (layout_type === layout_type_map.MODERN) {
        return generateModernOpenSourceWorkCard({ works, layout_no })
    }


}
export default OpenSourceWorkCard