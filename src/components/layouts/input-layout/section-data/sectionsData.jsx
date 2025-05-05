import { classical_keys, creative_keys, modern_keys, simple_keys } from "./layout_keys";
import sectionComponents from "./layouts-section-data";
// Layout Definitions
const layoutSections = {
    "classical": {
        "layout1": classical_keys.layout_1,
        "layout2": classical_keys.layout_2,
        "layout3": classical_keys.layout_3,
        "layout4": classical_keys.layout_4,
        "layout5": classical_keys.layout_5,
        "layout6": classical_keys.layout_6
    },
    "modern": {
        "layout1": modern_keys.layout_1,
        "layout2": modern_keys.layout_2,
        "layout3": modern_keys.layout_3,
        "layout4": modern_keys.layout_4,
        "layout5": modern_keys.layout_5,
     "   layout6": modern_keys.layout_6
    },
    "simple": {
        "layout1": simple_keys.layout_1,
        "layout2": simple_keys.layout_2,
        "layout3": simple_keys.layout_3,
        "layout4": simple_keys.layout_4,
        "layout5": simple_keys.layout_5,
        "layout6": simple_keys.layout_6
    },
    "creative": {
        "layout1": creative_keys.layout_1,
        "layout2": creative_keys.layout_2,
        "layout3": creative_keys.layout_3,
        "layout4": creative_keys.layout_4,
        "layout5": creative_keys.layout_5
    }
};

// Generator
const generateLayoutData = ({layoutType = "classical", layoutKey = "layout1"}) => {
    return layoutSections[layoutType][layoutKey].map((key) => ({
        key,
        content: () => sectionComponents[key](),
    }));
};

export default generateLayoutData