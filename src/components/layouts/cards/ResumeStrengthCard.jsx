import { layout_type_map } from "../../../constant"

import { H1, H2, P } from "../../elements/resumeSectionWrapper"


const generateSimpleStrengthCard = ({ strength, layout_no, style }) => {
    return (
        <>

            <div className="text-left">
                <h2 style={{ ...style?.sectionSubHeader }}>{strength.title}</h2>
                <p style={{ ...style?.p }}>{strength.description}</p>
            </div>


        </>
    )
}
const StrengthCard = ({ strength, layout_no, layout_type = "modern", style }) => {

    return generateSimpleStrengthCard({ strength, layout_no, style })

}
export default StrengthCard