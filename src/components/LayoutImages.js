import creative_layout_1 from "../assets/layout-images/creative/creative_layout_1.png"
import creative_layout_2 from "../assets/layout-images/creative/creative_layout_2.png"
import creative_layout_3 from "../assets/layout-images/creative/creative_layout_3.png"
import creative_layout_4 from "../assets/layout-images/creative/creative_layout_4.png"
import creative_layout_5 from "../assets/layout-images/creative/creative_layout_5.png"



//classical layouts
import classical_layout_1 from "../assets/layout-images/classic/classic_layout_1.png"
import classical_layout_2 from "../assets/layout-images/classic/classic_resume_2.png"
import classical_layout_3 from "../assets/layout-images/classic/classic_resume_3.png"
import classical_layout_4 from "../assets/layout-images/classic/classic_resume_4.png"
import classical_layout_5 from "../assets/layout-images/classic/classic_resume_5.png"
import classical_layout_6 from "../assets/layout-images/classic/classic_resume_6.png"

//modern layouts
import modern_layout_1 from "../assets/layout-images/modern/modern_layout_1.png"
import modern_layout_2 from "../assets/layout-images/modern/modern_layout_2.png"
import modern_layout_3 from "../assets/layout-images/modern/modern_layout_3.png"
import modern_layout_4 from "../assets/layout-images/modern/modern_layout_4.png"
import modern_layout_5 from "../assets/layout-images/modern/modern_layout_5.png"
import modern_layout_6 from "../assets/layout-images/modern/modern_layout_6.png"

//simple layouts
import simple_layout_1 from "../assets/layout-images/simple/simple_layout_1.png"
import simple_layout_2 from "../assets/layout-images/simple/simple_layout_2.png"
import simple_layout_3 from "../assets/layout-images/simple/simple_layout_3.png"
import simple_layout_4 from "../assets/layout-images/simple/simple_layout_4.png"
import simple_layout_5 from "../assets/layout-images/simple/simple_layout_5.png"



export const classical_layouts_image_map = {
  "classical": {
    "Ivy League": classical_layout_1,
    "Timeline": classical_layout_2,
    "Elite": classical_layout_3,
    "Single Column": classical_layout_4,
    "Traditional": classical_layout_5,
    "Monochrome": classical_layout_6
  }
};

export const modern_layouts_image_map = {
  "modern": {
    "Elegan Modern": modern_layout_1,
    "Stylish Modern": modern_layout_2,
    "Double Colum Modern": modern_layout_3,
    "Modern": modern_layout_4,
    "creative": modern_layout_5,
    "Compact Modern": modern_layout_6
  }
};
export const creative_layouts_image_map = {
  "creative": {
    "Stylish": creative_layout_1,
    "Double column": creative_layout_2,
    "compact": creative_layout_3,
    "Elegant": creative_layout_4,
    "Creative": creative_layout_5
  }
};
export const simple_layout_image_map = {
  "simple": {
    'Ivy League': simple_layout_1,
    'Double column': simple_layout_2,
    'Single column refined': simple_layout_3,
    'Single column': simple_layout_4,
    'Timeline': simple_layout_5
  }
}
export const all_layouts_image_map = {
  ...classical_layouts_image_map,
  ...modern_layouts_image_map,
  ...creative_layouts_image_map,
  ...simple_layout_image_map,
};

export const most_used_layouts_map = { ...modern_layouts_image_map }


export const mostPopularClassicalLayouts = Object.fromEntries(Object.entries(classical_layouts_image_map).slice(0, 3))
export const mostPopularModernLayouts = Object.fromEntries(Object.entries(modern_layouts_image_map).slice(0, 3))
export const mostPopularCreativeLayouts = Object.fromEntries(Object.entries(creative_layouts_image_map).slice(0, 3))
export const mostPopularSimpleLayouts = Object.fromEntries(Object.entries(simple_layout_image_map).slice(0, 3))
