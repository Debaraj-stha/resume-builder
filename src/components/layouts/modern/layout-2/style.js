import base_style from "../../style/base_style";
const primaryColor= "rgb(10, 95, 71)"
export const layout_2_style = {
    ...base_style.main_style,
   primaryColor:primaryColor , // Fresh teal green used for headings and accents
    fontFamily: "'Suranna', sans-serif", // Clean, modern sans-serif font
    textColor: "#444444", // Dark gray for regular text
    headerTextColor: "#24aa92", // Teal for name and titles
    subTextColor: "#666666", // Slightly lighter gray for paragraphs
    accentColor: "#24aa92", // Teal for highlights

    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "30px",
        fontFamily: "'Suranna', sans-serif",
        color: "rgb(10, 95, 71)",
        textAlign: "left"

    },
   
    titleStyle: {
        ...base_style.titleStyle,
        fontSize: "16px",
        color: "#24aa92",
        letterSpacing: "0px",
        textAlign: "left"
    },
    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        listStylePosition: "inside",
        gap: "5px"
    },

    profile_li: {
        ...base_style.profile_li,
        color: "#999",
        justifyContent: "space-between",
        iconColor: "#999"
    },

    sectionHeader: {
        ...base_style.sectionHeader,
        color: "#999",
        fontWeight: "500"
    },
    sectionSubHeader: {
        ...base_style.sectionSubHeader,
        color: "#24aa92",
    },

    p: {
        ...base_style.p,
        color: "#666666",

    },

    h1: {

        ...base_style.h1,
        color: primaryColor,
    },

    h2: {
        ...base_style.h2,
        color: "#24aa92",

    },

    h3: {
        ...base_style.h3,
         color: "#24aa92",

    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#e7f7f4",
        color: "#24aa92",
    },

      barStyle:{
        ...base_style.barStyle,
        fillColor:primaryColor,
        thumbColor:"#069c2e",
        thumbBorderColor:"#069c2e"
    }
};
