import base_style from "../../style/base_style"
export const layout_5_style = {
    ...base_style.main_style,
    fontFamily: "'Roboto', sans-serif", // Sleek, modern font used throughout
    headerBackground: "#000000",
    textColor: "#1a1a1a",
    headerTextColor: "#ffffff",
    subTextColor: "#4f4f4f",
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "32px",
        fontFamily: "'Inter', sans-serif",
        color: "#ffffff",
    },
    titleStyle: {
        ...base_style.titleStyle,
        color: "#ffffff",
        textAlign: "left",
    },

    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        gap: "8px"
    },

    profile_li: {
        ...base_style.profile_li,
        color: "#ffffff",
        iconColor: "#ffffff"
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
       ...base_style.h1
    },

    h2: {
        ...base_style.h2
    },

    h3: {
       ...base_style.h3
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#f2f2f2",
        color: "#000000",
    },
    progressBar: {
        ...base_style.progressBar
    },
    barStyle: {
        ...base_style.barStyle
      }

};
