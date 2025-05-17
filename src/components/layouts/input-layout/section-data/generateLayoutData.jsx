import { layout_type_map } from "../../../../constant";
import generateLayoutData from "./sectionsData";

// A helper to generate layout objects
const createLayouts = (layoutType, keys, props) => {
    return Object.fromEntries(keys.map((key) => [key, generateLayoutData({ layoutType, layoutKey: key, props })]))
};

// Shared layout keys
const layoutKeys = ["layout1", "layout2", "layout3", "layout4", "layout5", "layout6"];

// Classical layout (no layoutType)
export const classicalLayouts = (props = {}) => createLayouts(layout_type_map.CLASSICAL, layoutKeys, props)

// Themed layouts
export const modernLayouts = (props = {}) => createLayouts(layout_type_map.MODERN, layoutKeys, props);
export const creativeLayouts = (props = {}) => createLayouts(layout_type_map.CREATIVE, layoutKeys.slice(0, 5), props);
export const simpleLayouts = (props = {}) => createLayouts(layout_type_map.SIMPLE, layoutKeys.slice(0, 5), props);
