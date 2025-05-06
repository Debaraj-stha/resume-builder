import base_style from "../../style/base_style";
export const layout_2_style = {
   ...base_style.main_style,
    fontFamily: "'Poppins', sans-serif", // Clean, modern sans-serif font
    textColor: "#000000", // Main text in black
    headerTextColor: "#000000", // Headers in black
    subTextColor: "#4f4f4f", // Gray color for summary and bullet points
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
        textAlign: "left"
    },
    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        gap:"10px",
        listStylePosition:"inside"
    },
    profile_li: {
        fontSize: "12px",
        color: "#333333",
        padding: "0 8px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        iconColor: "#555555"
    },

    profile_li: {
        ...base_style.profile_li,
        color: "#000000",
        justifyContent:"space-between",
        iconColor:"#0040ff"
    },

    sectionHeader: {
        ...base_style.sectionHeader
    },
    sectionSubHeader: {
        ...base_style.sectionSubHeader,
        color: "#0040ff", 
      
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
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#f5f5f5", 
        display: "inline-block",
      
    },
};
