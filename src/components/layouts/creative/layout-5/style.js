import base_style from "../../style/base_style";
export const layout_5_style = {
  ...base_style.main_style,
    primaryColor: "#e4572e", // Bold orange for highlights
    headerBackground: "#e4572e",
    textColor: "#000000", // Black main text
    headerTextColor: "#e4572e", // Orange name and headings
    subTextColor: "#4f4f4f", // Grey secondary text
    accentColor: "#e4572e",
    fontFamily: "'Open Sans', sans-serif", // Clean and readable font
  
    nameStyle: {
      ...base_style.nameStyle,
      fontSize: "28px",
      fontFamily: "'Open Sans', sans-serif",
      color: "#fff",
      textTransform: "capitalize",
      textAlign: "left",
      letterSpacing: "0px",
    },
  
    titleStyle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#fff",
      letterSpacing: "0px",
      textAlign: "left",
      fontFamily: "'Open Sans', sans-serif",
    },
  
    profile_ul: {
      ...base_style.profile_ul,
      justifyContent: "start",
      gap: "10px",
      fontFamily: "'Open Sans', sans-serif",
    },
  
    profile_li: {
      ...base_style.profile_li,
      color: "#fff",
      textAlign: "center",
      gap: "6px",
      iconColor: "#fff",
      fontFamily: "'Open Sans', sans-serif",
    },
  
    sectionHeader: {
  ...base_style.sectionHeader,
      color: "#e4572e",
      fontFamily: "'Open Sans', sans-serif",
    },
  
    sectionSubHeader: {
      ...base_style.sectionSubHeader,
      fontFamily: "'Open Sans', sans-serif",
      
    },
  
    p: {
     ...base_style.p,
      color: "#4f4f4f",
      fontFamily: "'Open Sans', sans-serif",
    },
  
    h1: {
      ...base_style.h1,
      fontFamily: "'Open Sans', sans-serif",
    },
  
    h2: {
      ...base_style.h2,
      fontFamily: "'Open Sans', sans-serif",
    },
  
    h3: {
    ...base_style.h3,
      fontFamily: "'Open Sans', sans-serif",
    },
    progressBar:{
      ...base_style.progressBar
    },
    barStyle:{
      ...base_style.barStyle
    }
  };
  