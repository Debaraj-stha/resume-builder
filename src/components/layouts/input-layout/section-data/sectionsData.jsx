import { layout_type_map } from "../../../../constant";
import { classical_keys, creative_keys, modern_keys, simple_keys } from "./layout_keys";
import sectionComponents from "./layouts-section-data";
const generatelayoutSections = () => {
    const layoutGroups = {
        [layout_type_map.CLASSICAL]: classical_keys,
        [layout_type_map.MODERN]: modern_keys,
        [layout_type_map.CREATIVE]: creative_keys,
        [layout_type_map.SIMPLE]: simple_keys,
    }
    const result = {}
    for (const [type, keys] of Object.entries(layoutGroups)) {
        result[type] = {}
        Object.entries(keys).forEach(([layoutKey, sectionList]) => {
            const layoutNumber = layoutKey.replace("layout_", "layout")
            result[type][layoutNumber] = sectionList
        })
    }
    return result

}
const layouts = generatelayoutSections()
// Generator
const generateLayoutData = ({ layoutType = "classical", layoutKey = "layout1",props={} }) => {
    return layouts[layoutType][layoutKey].map((key) => {  
        return ({
        key,
        content: () => sectionComponents[key](props?.[key]),
    })
    });
};

export default generateLayoutData