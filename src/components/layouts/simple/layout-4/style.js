import base_style from "../../style/base_style";
export const layout_4_style = {
    ...base_style.main_style,
    
    fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
    headerBackground: "#ffffff",
    textColor: "#000000",
    headerTextColor: "#000",
    subTextColor: "#4f4f4f",
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "28px",
        fontFamily: "'Poppins', sans-serif",
        textTransform: "none",
        textAlign:"left"
    },
    titleStyle: {
        ...base_style.titleStyle,
        fontSize: "16px",
        color: "#000",
        letterSpacing: "0px",
         textAlign:"left"
    },
    profile_ul: {
        ...base_style.profile_ul,
        gap: "8px",
        listStyleType: "none",
        padding: "0",
        margin: "0 0 10px",
        justifyContent:"space-between"
    },

    profile_li: {
        ...base_style.profile_li,
        fontSize: "11px",
        color: "#000000",
        gap: "4px",
        iconColor: "rgb(6, 51, 228)",
    },

    sectionHeader: {
       ...base_style.sectionHeader
    },

    sectionSubHeader: {
       ...base_style.sectionSubHeader
    },

    p: {
        ...base_style.p,
        color: "#4f4f4f",
    },

    h1: {
        ...base_style.h1,
    },

    h2: {
        ...base_style.h2,
         
    },

    h3: {
        ...base_style.h3,
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#e6f0fd",
        color: "#000",
       
    },
};
