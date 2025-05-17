import base_style from "../../style/base_style"

export const layout_4_style = {
    ...base_style.main_style,
    primaryColor: "#f37021", // Orange accent used for icons, headings, and highlights
    fontFamily: "'Inter', sans-serif", // Clean modern sans-serif used in the design
    headerBackground: "#ffffff",
    textColor: "#1a1a1a",
    headerTextColor: "#0f0771",
    subTextColor: "#4f4f4f",
    accentColor: "#f37021",
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "32px",
        fontFamily: "'Inter', sans-serif",
        color: "#0f0771",
         textAlign: "left"
    },
    titleStyle: {
        ...base_style.titleStyle,
        fontSize: "14px",
        color: "#f37021",
        textAlign: "left",
    },
    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        padding: "0",
        gap: "8px"
    },
    profile_li: {
        ...base_style.profile_li,
        color: "#1a1a1a",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
        iconColor: "#f37021"
    },
    sectionHeader: {
        ...base_style.sectionHeader,
        color: "#0f0771",
       
    },


    sectionSubHeader: {
        ...base_style.sectionSubHeader,
    },

    p: {
        ...base_style.p,
        color: "#4f4f4f",
        
    },

    h1: {
        ...base_style.h1,
        color: "#0f0771"
    },

    h2: {
        ...base_style.h2,
        color: "#0f0771",
    
    },

    h3: {
       ...base_style.h3,
        color: "#f37021",
        
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#fef4ed",
        color: "#f37021",
        
    },
    barStyle: {
        fillColor: "#1a355b",
        height: "6px",
        borderRadius: "4px",
        thumbColor: "#fff",
        thumbBorderColor: "#1a355b",
        thumbSize: "14px",
      }
};
