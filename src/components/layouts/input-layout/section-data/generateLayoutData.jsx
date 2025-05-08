import { layout_type_map } from "../../../../constant";
import generateLayoutData from "./sectionsData";

// A helper to generate layout objects
const createLayouts = (layoutType, keys) => {
    return Object.fromEntries(keys.map((key,index)=>[key,generateLayoutData({layoutType,layoutKey:key})]))

};

// Shared layout keys
const layoutKeys = ["layout1", "layout2", "layout3", "layout4", "layout5", "layout6"];

// Classical layout (no layoutType)
export const classicalLayouts = createLayouts(layout_type_map.CLASSICAL,layoutKeys)

// Themed layouts
export const modernLayouts = createLayouts(layout_type_map.MODERN, layoutKeys);
export const creativeLayouts = createLayouts(layout_type_map.CREATIVE, layoutKeys.slice(0, 5));
export const simpleLayouts = createLayouts(layout_type_map.SIMPLE, layoutKeys.slice(0, 5));
