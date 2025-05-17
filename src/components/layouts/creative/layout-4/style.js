import base_style from "../../style/base_style";
export const layout_4_style = {
    ...base_style.main_style,
    primaryColor: "#a32e2e", // Deep red used for the sidebar and highlights
    headerBackground: "#ffffff", // Header matches main background
    textColor: "#000000", // Main text in black
    headerTextColor: "#a32e2e", // Name and key headings in red
    subTextColor: "#4f4f4f", // Secondary content in grey
    accentColor: "#a32e2e", // Sidebar icons and section headers

    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "30px",
        fontFamily: "'Roboto', sans-serif",
        color: "#a32e2e",
        letterSpacing: "1px",
    },

    titleStyle: {
        ...base_style.titleStyle,
        color: "#a32e2e",
        letterSpacing: "0px",
        fontFamily: "'Roboto', sans-serif",
    },

    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        gap: "10px",
        fontFamily: "'Roboto', sans-serif",
    },

    profile_li: {
        ...base_style.profile_li,
        color: "#000000",
        gap: "6px",
        iconColor: "#a32e2e",
        fontFamily: "'Roboto', sans-serif",
    },

    sectionHeader: {
        ...base_style.sectionHeader,
        color: "#a32e2e",
        fontFamily: "'Roboto', sans-serif",
    },

    sectionSubHeader: {
        
      ...base_style.sectionSubHeader,
        fontFamily: "'Roboto', sans-serif",
    
    },

    p: {
      ...base_style.p,
        color: "#4f4f4f",
        fontFamily: "'Roboto', sans-serif",
    },

    h1: {
       ...base_style.h1
    },

    h2: {
        
        ...base_style.h2,
    },

    h3: {
       ...base_style.h3
    },
    progressBar:{
        ...base_style.progressBar,
        fillColor:"#a32e2e"
    },
    barStyle:{
        ...base_style.barStyle,
        fillColor:"#a32e2e"
    }
};
