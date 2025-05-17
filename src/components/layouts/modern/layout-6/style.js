import base_style from "../../style/base_style";

export const layout_6_style = {
    ...base_style.main_style,
    primaryColor: "#009688", // Teal green used throughout for headers and highlights
    fontFamily: "'Inter', sans-serif",
    headerBackground: "#ffffff",
    textColor: "#1a1a1a",
    headerTextColor: "#009688",
    subTextColor: "#4f4f4f",
    accentColor: "#009688",
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "30px",
        fontFamily: "'Inter', sans-serif",
        color: "#1a1a1a",
        textTransform: "none",
        textAlign: "left"
    },
    titleStyle: {
        ...base_style.titleStyle,
        color: "#009688",
        letterSpacing: "0px",
        textAlign: "left"
    },
    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
    },
    profile_li: {
        ...base_style.profile_li,
        color: "#1a1a1a",
        padding: "4px 10px",
        iconColor: "#009688"
    },
    sectionHeader: {
        ...base_style.sectionHeader,
        color: "#009688",
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
        color: "#009688"
    },

    h2: {
        ...base_style.h2,
        color: "#009688",

    },

    h3: {
        ...base_style.h3,
        color: "#009688",

    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#e6f4f2",

    },
    progressBar: {
        ...base_style.progressBar,
        fillColor: "#009688"
    }
};
