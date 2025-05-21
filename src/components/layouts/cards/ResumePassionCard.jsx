
import { FlexBox } from "../../CustomComponents"
import { FaFire } from "react-icons/fa"
const generateModernPassionCard = ({ passion, style, ...props }) => {
    const { shouldIncludeIcon } = props
    return (
        <>
            <FlexBox margin="0" gap="10px">
               {
                shouldIncludeIcon && <FaFire color={style?.iconColor?style?.iconColor:"orange"}/>
               }
                <h2 style={{ ...style.sectionSubHeader }}>{passion.passion}</h2>
            </FlexBox>
        </>
    )

}
const PassionCard = ({ passion,  style, ...props }) => {

    return generateModernPassionCard({ passion,  style, ...props })

}

export default PassionCard