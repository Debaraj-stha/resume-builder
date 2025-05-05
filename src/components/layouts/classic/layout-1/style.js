import base_style from "../../style/base_style"

export const layout_1_style = {

    ...base_style.main_style,
    fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
    textColor: "#000000", // Main text in black
    headerTextColor: "#000000", // Headers in black
    subTextColor: "#4f4f4f", // Gray color for summary and bullet points
    accentColor: "#000000", // No accent color (monochrome)
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "28px",
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "1px",
    },

    titleStyle: {
        ...base_style.titleStyle,
        fontSize: "16px",
        color: "#4f4f4f", // For subheaders like "Buyside and Sellside M&A"
        letterSpacing: "0px",
        textAlign: "center"
    },

    profile_ul: {
        ...base_style.profile_ul,
        listStyleType:"disc",
          listStylePosition:"inside",
        margin:"0"
    },

    profile_li: {
        ...base_style.profile_li,
        display:"list-items"
    },
    sectionHeader: {
        ...base_style.sectionHeader,
        textAlign: "center",
   
    },
    sectionSubHeader: {
        ...base_style.sectionSubHeader
    },

    p: {
        ...base_style.p,
        color: "#4f4f4f",
        
    },

    h1: {
        ...base_style.h1
    },

    h2: {
        ...base_style.h2
    },

    h3: {
       ...base_style.h3
    },

    tagStyle: {
       ...base_style.tagStyle
    },
};
