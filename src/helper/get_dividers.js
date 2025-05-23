import { useMemo } from "react"

const getDividerForCreaiveLayout = (layout_id) => {
    console.log("called creative layout",layout_id)
    let dividerType = useMemo(() => {
        if (layout_id == 1) {
            return "TransparentLineWithAngleAtCenter"
        }
        else if (layout_id === 2) {
            return "TransparentLineWithBox"
        }
        else {
            return "transparent_line"
        }
    }, [layout_id])


    return dividerType
}
const getDividerForSimpleLayout = (layout_id) => {
    let dividerType = useMemo(() => {
            return "LineDivider"
    }, [layout_id])
    return dividerType
 }
const getDividerForModernLayout = (layout_id) => {
    const dividerType=useMemo(()=>{
        return "LineDivider"
    },[layout_id])
    return dividerType
 }
const getDividerForClassicalLayout = (layout_id) => { 
    const dividerType=useMemo(()=>{
        return "transparent_line"
    },[layout_id])
    return dividerType

}
const getDividerForLayout = (layout_id, layout_type) => {
    console.log("layout id",layout_id,"layout type",layout_type)
    switch (layout_type) {
        case "simple":
            return getDividerForSimpleLayout(layout_id)
        case "modern":
            return getDividerForModernLayout(layout_id)
        case "classical":
            return getDividerForClassicalLayout(layout_id)
        case "creative":
            return getDividerForCreaiveLayout(layout_id)
        default:
            return null
    }
}
export {
    getDividerForCreaiveLayout,
    getDividerForSimpleLayout,
    getDividerForModernLayout,
    getDividerForClassicalLayout
}

export default getDividerForLayout