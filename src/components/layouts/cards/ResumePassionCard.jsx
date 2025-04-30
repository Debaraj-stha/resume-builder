
import { FlexBox } from "../../CustomComponents"
import { FaFire } from "react-icons/fa"
const generateModernPassionCard = ({ passion, layout_no, style, ...props }) => {
    const { shouldIncludeIcon } = props
    return (
        <>
            <FlexBox margin="0" gap="10px">
               {
                shouldIncludeIcon && <FaFire color={style?.iconColor?style?.iconColor:"orange"}/>
               }
                <h2 style={{ ...style.sectionSubHeader }}>{passion}</h2>
            </FlexBox>
        </>
    )

}
const PassionCard = ({ passion, layout_type = "modern", layout_no, style, ...props }) => {

    return generateModernPassionCard({ passion, layout_no, style, ...props })

}

export default PassionCard