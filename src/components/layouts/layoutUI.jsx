import { memo } from "react";



import getModernLayout1 from "./layoutui/modernLayout1";
import getModernLayout2 from "./layoutui/modernLayout2";
import getModernLayout3 from "./layoutui/modern-layout3";
import getModernLayout4 from "./layoutui/modern-layout-4";
import renderClassicalUI from "./classic/render_ui";
import getModernLayout5 from "./layoutui/modern-layout-5";
import getModernLayout6 from "./layoutui/modern-layout-6";
import { layout_type_map } from "../../constant";
import getSimpleLayout1 from "./layoutui/simple/simple-layout-1";



const LayoutUi = memo(({ pages, layoutId, key_val, sectionRefs, layout_type = "classical",shouldImplementFlex=false }) => {
    console.log("layout type",layout_type)

    switch (layout_type) {
        case layout_type_map.CLASSICAL:
            return renderClassicalUI({ pages, key_val, sectionRefs, layoutId, layout_type })

        case layout_type_map.MODERN:
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
        case layout_type_map.SIMPLE:
            return getSimpleLayout1({pages,layoutId,key_val,layout_type:"simple",sectionRefs,shouldImplementFlex})


        default:
            console.log("default")
    }

});

export default LayoutUi;
