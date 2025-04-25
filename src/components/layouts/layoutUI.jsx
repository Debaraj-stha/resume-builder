import { memo } from "react";
import common from "./classic/style/common.json";


import getModernLayout1 from "./layoutui/modernLayout1";
import getModernLayout2 from "./layoutui/modernLayout2";
import getModernLayout3 from "./layoutui/modern-layout3";
import getModernLayout4 from "./layoutui/modern-layout-4";
import renderClassicalUI from "./classic/render_ui";
import getModernLayout5 from "./layoutui/modern-layout-5";
import getModernLayout6 from "./layoutui/modern-layout-6";







const LayoutUi = memo(({ pages, layoutId, key_val, sectionRefs, layout_type = "classical" }) => {


    const layout_type_map = {
        1: "classical",
        2: "modern",
        3: "simple",
        4: "creative"
    }
    switch (layout_type) {
        case layout_type_map[1]:
            return renderClassicalUI({ pages, key_val, sectionRefs, layoutId, layout_type })

        case layout_type_map[2]:
            switch (layoutId) {
                case 1:
                    return getModernLayout1({ pages, layoutId, key_val, layout_type, sectionRefs })
                case 2:
                    return getModernLayout2({ pages, layoutId, key_val, layout_type, sectionRefs })
                case 3:
                    return getModernLayout3({ pages, layoutId, key_val, layout_type, sectionRefs })
                case 4:
                    return getModernLayout4({ pages, layoutId, key_val, layout_type, sectionRefs })
                case 5:
                    return getModernLayout5({ pages, layoutId, key_val, layout_type, sectionRefs })
                case 6:
                    return getModernLayout6({ pages, layoutId, key_val, layout_type, sectionRefs })



            }


        default:
            console.log("default")
    }

});

export default LayoutUi;
