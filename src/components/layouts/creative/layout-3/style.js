import base_style from "../../style/base_style";
export const layout_3_style = {
    ...base_style.main_style,
    primaryColor: "#0040ff", // Strong blue accent used for titles and highlights
    fontFamily: "'Gidole', sans-serif", // Modern sans-serif font
    backgroundColor: "#eaf3ff", // Soft pastel blue background
    headerBackground: "#eaf3ff", // Matches overall background
    textColor: "#000000", // Main text in black
    headerTextColor: "#0040ff", // Name and headings in blue
    subTextColor: "#4f4f4f", // Grey for secondary content
    accentColor: "#0040ff", // Blue for accents, bars, and icons

    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "28px",
        fontFamily: "'Gidole', sans-serif",
        color: "#0040ff",
        textAlign: "left",
        letterSpacing: "1px",
    },

    titleStyle: {
        ...base_style.titleStyle,
        fontSize: "16px",
        color: "#0040ff",
        letterSpacing: "0px",
        textAlign: "left",
        fontFamily: "'Gidole', sans-serif",
    },

    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        gap: "10px",
        fontFamily: "'Gidole', sans-serif",
    },

    profile_li: {
        ...base_style.profile_li,
        fontSize: "14px",
        color: "#000000",
        padding: "4px 8px",
        gap: "6px",
        iconColor: "#0040ff",
        fontFamily: "'Gidole', sans-serif",
    },

    sectionHeader: {
        ...base_style.sectionHeader,
        color: "#0040ff",
        fontFamily: "'Gidole', sans-serif",
    },

    sectionSubHeader: {
      ...base_style.sectionSubHeader,
        color: "#0040ff",
        fontFamily: "'Gidole', sans-serif"
    },

    p: {
        ...base_style.p,
        color: "#4f4f4f",
        fontFamily: "'Gidole', sans-serif",
    },

    h1: {
        ...base_style.h1,

        fontFamily: "'Gidole', sans-serif",
    },

    h2: {
        ...base_style.h2,
        
        fontFamily: "'Gidole', sans-serif",
    },

    h3: {
        ...base_style.h3,
        fontFamily: "'Gidole', sans-serif",
    },
    progressBar:{
        ...base_style.progressBar,
        fillColor:"#0040ff"
    },
    barStyle:{
        ...base_style.barStyle,
        fillColor:"#0040ff"
    }
};
