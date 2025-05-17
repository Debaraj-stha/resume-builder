import base_style from "../../style/base_style"
export const layout_3_style = {
    ...base_style.main_style,
    primaryColor: "#0056d2", // Strong blue used for headers and accents
    fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
    headerBackground: "#ffffff",
    textColor: "#000000",
    headerTextColor: "#0056d2",
    subTextColor: "#4f4f4f",
    accentColor: "#0056d2",
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "36px",
        fontWeight:"500",
        fontFamily: "'Poppins', sans-serif",
        color: "#0f0771",
        textTransform: "none",
        textAlign:"left"
    },
    titleStyle: {
        ...base_style.titleStyle,
        color: "#0056d2",
        letterSpacing: "0px",
        textAlign:"left"
    },
    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        listStylePosition:"inside",
        gap:"5px"
    },
    profile_li: {
        ...base_style.profile_li,
        fontSize: "14px",
        color: "#000000",
        justifyContent:"space-between",
        iconColor:"#0056d2"
    },
    sectionHeader: {
        ...base_style.sectionHeader,
        fontSize:"18px",
        fontWeight:"500",
        color: "#0f0771",
      
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
       ...base_style.h3,
        color: "#0f0771",
    
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#e6f0fd",
        color: "#0056d2",
    },

    progressBar: {
        backgroundColor: "#e0e0e0",
        fillColor: "#000000",
        height: "4px",
        borderRadius: "2px",
    },
};
