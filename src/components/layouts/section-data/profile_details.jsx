import { layout_type_map } from "../../../constant"
import ResumeHeader from "../cards/ResumeHeader"

const generateProfileDetails = ({ personalDetails, layout_no, layout_type = layout_type_map.CLASSICAL
    , style,
    props = {}
}) => {


    return {
        key: "personalDetails",
        content: () => <ResumeHeader
            personalDetails={personalDetails}
            layout_no={layout_no}
            layout_type={layout_type}
            style={style}
            {...props}
        />,
    }
}
export default generateProfileDetails