import { memo } from "react"
import { H2, H3, P } from "../../elements/resumeSectionWrapper"
//styles
import style from "../classic/style/layout1_style.json"
import { layout_type_map } from "../../../constant"
import { BiCheck, BiCheckSquare } from "react-icons/bi"
import { FlexBox } from "../../CustomComponents"


const generateClassicAchievementCard = ({ my_acheivement, layout_no }) => {
    const { acheivement, field, date } = my_acheivement
    switch (layout_no) {
        case 5:
            return (
                <div>
                    <H2 textAlign={style.AcheivementCard.h3.textAlign} fontSize="15px">{acheivement}</H2>
                    <P fontFamily="Open Sans" fontSize="14px">{field} {date}</P>
                </div>
            )
        default:
            return (
                <div>
                    <H3 textAlign={style.AcheivementCard.h3.textAlign}>{acheivement}</H3>
                    <P>{field} {date}</P>
                </div>
            )
    }
}

const generateModernAchievementCard = ({ my_acheivement, layout_no }) => {
    const { acheivement, field, date } = my_acheivement
    switch (layout_no) {
        case 1:
            return (
                <div className="my-3">
                    <FlexBox margin="0">
                        <div>
                            <BiCheckSquare color="white" size={25} />
                        </div>

                        <div>
                            <H2 textAlign={style.AcheivementCard.h3.textAlign} fontSize="15px" color="#eee3e3" fontWeight="600">{acheivement}</H2>

                            <P fontFamily="Open Sans" fontSize="14px" color="#eee3e3">{field} {date}</P>
                        </div>
                    </FlexBox>
                </div>
            )
        default:
            return (
                <div>
                    <H3 textAlign={style.AcheivementCard.h3.textAlign}>{acheivement}</H3>
                    <P>{field} {date}</P>
                </div>
            )
    }
}
const AcheivementCard = memo(({ my_acheivement, layout_no, layout_type = "classical" }) => {
    if (layout_type === layout_type_map.CLASSICAL) {
        return generateClassicAchievementCard({ my_acheivement, layout_no })
    }
    if (layout_type === layout_type_map.MODERN) {
        return generateModernAchievementCard({ my_acheivement, layout_no })
    }

})

export default AcheivementCard