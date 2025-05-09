import { layout_type_map } from "../../../constant"
import ResumeHeader from "../cards/ResumeHeader"

const generateProfileDetails = ({ personalDetails, style,
    props = {}
}) => {


    return {
        key: "personalDetails",
        content: () => <ResumeHeader
            personalDetails={personalDetails}
            style={style}
            {...props}
        />,
    }
}
export default generateProfileDetails