import base_style from "../../style/base_style"
export const layout_4_style = {
    ...base_style.main_style,   
    primaryColor: "#0056d2", // Strong blue used for headers and accents
    headerBackground: "#ffffff",
    textColor: "#000000",
    headerTextColor: "#0056d2",
    subTextColor: "#4f4f4f",
    accentColor: "#0056d2",
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "28px",
        fontFamily: "'Roboto', sans-serif",
        textAlign:"left"

    },
    titleStyle: {
        ...base_style.titleStyle,
        fontSize: "16px",
        color: "#0056d2",
        letterSpacing: "0px",
    },
    sectionHeader: {
        ...base_style.sectionHeader,
        fontSize: "14px",
        fontWeight: "600",
    
    },

    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "space-between",
        listStylePosition:"inside"
    },

    profile_li: {
        ...base_style.profile_li,
        color: "#000000",
        justifyContent:"space-between",
        iconColor:"#000",
    },
    sectionSubHeader: {
        ...base_style.sectionSubHeader,
        fontWeight: "600",
        margin: "4px 0",
    },
    p: {
        ...base_style.p,
        color: "#4f4f4f",
       
    },

    h1: {
        ...base_style.h1,
        teatAlign:"left"
    },

    h2: {
       ...base_style.h2,
        textAlign: "center"
    },

    h3: {
        ...base_style.h3,
        textAlign: "left"
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#e6f0fd",
        color: "#0056d2",
   
    },
};
