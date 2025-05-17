import base_style from "../../style/base_style";
export const layout_2_style = {
  ...base_style.main_style,
    primaryColor: "#1c1c1c",
    fontFamily: "'Lato', sans-serif", // Modern and professional
    headerBackground: "#ffffff",
    textColor: "#1c1c1c",
    headerTextColor: "#1c1c1c",
    subTextColor: "#4f4f4f",
    accentColor: "#00c4cc", // Used in bars and highlights
    nameStyle: {
      ...base_style.nameStyle,
      fontSize: "28px",
      fontFamily: "'Lato', sans-serif",
      color: "#1c1c1c",
      textTransform: "capitalize",
      textAlign: "left",
      letterSpacing: "0.5px",
    },
  
    titleStyle: {
      ...base_style.titleStyle,
      color: "#00c4cc",
      letterSpacing: "0px",
      textAlign: "left"
    },
    profile_ul: {
      ...base_style.profile_ul,
      justifyContent: "start",
      listStyleType: "none",
      gap: "8px"
    },
  
    profile_li: {
      ...base_style.profile_li,
      color: "#1c1c1c",
      padding: "4px 8px",
      iconColor: "#00c4cc"
    },
  
    sectionHeader: {
      ...base_style.sectionHeader,
      color: "#1c1c1c",
    },
  
    sectionSubHeader: {
      ...base_style.sectionSubHeader,
      color: "#00c4cc",
    
    },
  
    p: {
      ...base_style.p,
      color: "#4f4f4f",

    },
  
    h1: {
     ...base_style.h1,
      color: "#1c1c1c",
    },
  
    h2: {
      ...base_style.h2,
      color: "#1c1c1c",

    },
  
    h3: {
     ...base_style.h3,
      color: "#1c1c1c",

    },
  

  
    tagStyle: {
      backgroundColor: "#f0f9fa",
      color: "#1c1c1c",
      ...base_style.tagStyle
    },
    progressBar:{
      ...base_style.progressBar,
      fillColor:"#00c4cc"

    },
    barStyle:{
      ...base_style.barStyle,
        fillColor:"#00c4cc"
    }

  };
  