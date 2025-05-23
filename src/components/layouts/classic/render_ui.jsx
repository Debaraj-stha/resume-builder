
import { useEffect } from "react";
import { useDivider } from "../../../provider/DividerProvider";
import renderUI from "../render-ui";
const renderClassicalUI = ({ pages, key_val, layout_type, layoutId, sectionRefs, dividerType }) => {
    const { divider, changeDivider } = useDivider()
    useEffect(() => {
        changeDivider(dividerType)
    }, [dividerType])
    return renderUI({ pages, key_val, layoutId, layout_type, sectionRefs,divider})
}

export default renderClassicalUI