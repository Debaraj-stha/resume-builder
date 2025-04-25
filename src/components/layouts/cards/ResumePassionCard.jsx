import { layout_type_map } from "../../../constant"
import { H2 } from "../../elements/resumeSectionWrapper"
const generateModernPassionCard = ({ passion, layout_no,style }) => {
    switch (layout_no) {
        case 4:
            return (
                <>
                <H2 style={{...style.h2}}>{passion}</H2>
                </>
            )
    }
}
const PassionCard = ({ passion, layout_type = "modern", layout_no, style }) => {
    if (layout_type === layout_type_map.MODERN) {
        return generateModernPassionCard({ passion, layout_no, style })
    }
}

export default PassionCard