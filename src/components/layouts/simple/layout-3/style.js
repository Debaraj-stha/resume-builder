import base_style from "../../style/base_style";
export const layout_3_style = {
    ...base_style.main_style,
    fontFamily: "'Arial', sans-serif",
    textColor: "#000000",
    subTextColor: "#555555",
    nameStyle: {
        ...base_style.nameStyle,
        fontFamily: "'Georgia', serif",
        textTransform: "none",
        textAlign: "left",
    
    },

    titleStyle: {
        ...base_style.titleStyle,
        fontWeight: "600",
        color: "rgb(6, 51, 228)",
        textAlign: "left",
    },

    profile_ul: {
        ...base_style.profile_ul,
        gap: "8px",
        margin: "0 0 10px",
        justifyContent:"start"
    },

    profile_li: {
        ...base_style.profile_li,
        fontSize: "11px",
        color: "#000000",
        gap: "4px",
        iconColor: "rgb(6, 51, 228)",
    },

    sectionHeader: {
        ...base_style.sectionHeader,
    },

    sectionSubHeader: {
        ...base_style.sectionSubHeader,
        color: "rgb(6, 51, 228)",
    },

    p: {
       ...base_style.p
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
    base_style:{
        ...base_style.barStyle
    }
};
