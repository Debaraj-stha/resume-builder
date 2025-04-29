import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import { layout_1_style  as style} from "../layout-1/style";
const getCreativeLayout1OuctputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],

        openSourceWork = [],
        summary = ""
    } = data;
    return [
        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [personalDetails.urls[0]] },
            layout_no: layout_no,
            layout_type: layout_type_map.CREATIVE,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                titleStyle: style?.titleStyle
            },
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true
            }

        }),
    ]
}

export default getCreativeLayout1OuctputSectionData