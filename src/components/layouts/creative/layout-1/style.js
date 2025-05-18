import base_style from "../../style/base_style";
export const layout_1_style = {
    ...base_style.main_style,
    fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
    headerBackground: "#ffffff", // White header background
    textColor: "#000000", // Main text in black
    headerTextColor: "#000000", // Headers in black
    subTextColor: "#4f4f4f", // Gray color for summary and bullet points

    titleStyle: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#555555",
        letterSpacing: "0.5px",
        textAlign: "center",
    },
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "28px",
        fontFamily: "'Poppins', sans-serif",
        textTransform: "capitalize",
        textAlign: "left",
        letterSpacing: "1px",
    },

    titleStyle: {
        ...base_style.titleStyle,
        fontSize: "16px",
        color: "#0040ff",
        letterSpacing: "0px",
        textAlign: "left",
        fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
    },
    profile_ul:{
        ...base_style.profile_ul,
        justifyContent:"start",
        gap:"7px"
    },
    profile_li: {
        ...base_style.profile_li,
        color: "#000000",
        fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
        justifyContent: "space-between",
        iconColor: "#0040ff"
    },
    sectionHeader: {
        ...base_style.sectionHeader,
        fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
    },

    sectionSubHeader: {
        ...base_style.sectionSubHeader,
        color: "#0040ff",
        fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
        // margin: "4px 0",
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
};
