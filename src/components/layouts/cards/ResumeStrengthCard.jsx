import { PiStarFourThin } from "react-icons/pi"
import { layout_type_map } from "../../../constant"
import { FlexBox } from "../../CustomComponents"

import { H1, H2, P } from "../../elements/resumeSectionWrapper"
import { FaChessKnight } from "react-icons/fa"


const generateSimpleStrengthCard = ({ strength, layout_no, style, ...props }) => {
    const { side, shouldIncludeIcon } = props

    return (
        <>

            <div className="text-left mb-2">
                <FlexBox>
                    {shouldIncludeIcon && (
                        <div>
                            <FaChessKnight color={side==="right" ? "white" : style.iconColor}/>
                        </div>

                    )}
                    <div>
                        <h2 style={{ ...style?.sectionSubHeader, ...(side === "right" && { color: "white" }) }}>{strength.title}</h2>
                        <p style={{ ...style?.p, ...(side === "right" && { color: "white" }) }}>{strength.description}</p>
                    </div>
                </FlexBox>

            </div>


        </>
    )
}
const StrengthCard = ({ strength, layout_no, layout_type = "modern", style, ...props }) => {

    return generateSimpleStrengthCard({ strength, layout_no, style, ...props })

}
export default StrengthCard