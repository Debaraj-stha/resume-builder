import { memo } from "react"
import { H2, H3, P } from "../../elements/resumeSectionWrapper"
//styles

import { layout_type_map } from "../../../constant"
import { BiCheck, BiCheckSquare, BiMedal } from "react-icons/bi"
import { FlexBox, GridBox } from "../../CustomComponents"


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

const generateModernAchievementCard = ({ my_acheivement, layout_no, styles }) => {
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
        case 4:
            return (
                <>
                    <FlexBox margin="0">
                        <div className="pt-4">
                            <BiMedal color={styles.iconColor} />
                        </div>
                        <div>
                            <H3 style={{ ...styles.h3 }} textAlign="left">{acheivement}</H3>
                            <P style={{ ...styles.p }}>{field} {date}</P>
                        </div>

                    </FlexBox>
                </>
            )
        case 5:
            return (
                <div>
                    <h2 style={{ ...styles.h2 }}>{acheivement}</h2>
                    <P style={{ ...styles.p }}>{field} {date}</P>
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
const generateSimpleAchievementCard = ({ my_acheivement, layout_no, style, shouldApplyGrid }) => {
    const { acheivement, field, date } = my_acheivement
    if (shouldApplyGrid)
        return (
            <>
                <div className="grid grid-cols-2">
                    <div>
                        <h2 style={{ ...style.h2,textAlign:"left" }}>{acheivement}</h2>
                        <p style={{ ...style.p }}>{field}</p>
                    </div>

                </div>
            </>
        )
    return (
        <>
            <div>
                <h2 style={{ ...style.h2,textAlign:"left" }}>{acheivement}</h2>
                <p style={{ ...style.p }}>{field}</p>
            </div>
        </>
    )
}

const AcheivementCard = memo(({ my_acheivement, layout_no, style, layout_type = "classical", ...props }) => {
    const { shouldApplyGrid } = props
    // if (layout_type === layout_type_map.CLASSICAL) {
    //     return generateClassicAchievementCard({ my_acheivement, layout_no })
    // }
    // if (layout_type === layout_type_map.MODERN) {
    //     return generateModernAchievementCard({ my_acheivement, layout_no, styles: style })
    // }
    // if (layout_type === layout_type_map.SIMPLE) {
    return generateSimpleAchievementCard({ my_acheivement, layout_no, style, shouldApplyGrid })
    // }

})

export default AcheivementCard