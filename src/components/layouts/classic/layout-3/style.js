import base_style from '../../style/base_style'

export const layout_3_style = {
    ...base_style.main_style,
    primaryColor: "#0056d2", // Bright blue used for name title and headings
    fontFamily: "'Noto Serif', sans-serif",
    textColor: "#000000",
    headerTextColor: "#000000",
    subTextColor: "#4f4f4f", // Gray used for summary, details
    accentColor: "#0056d2", // Bright blue accents
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "22px",
        fontFamily: "'Noto Serif', sans-serif",
        letterSpacing: "1px",
    },
    profile_ul: {
        ...base_style.profile_ul
    },
    profile_li: {
        ...base_style.profile_li,
        display:"list-items"
        
    },
  
    titleStyle: {
        ...base_style.tagStyle,
        fontSize: "16px",
        textAlign:"left",
        color: "#0056d2", // Title (like "Full Stack Developer") in blue
        letterSpacing: "0px",
        fontFamily: "'Noto Serif', sans-serif",
    },

    sectionHeader: {
        ...base_style.sectionHeader,
        fontFamily: "'Noto Serif', sans-serif",
    },
    sectionSubHeader: {
        ...base_style.sectionSubHeader,
        color: "rgb(0, 86, 210)",
        fontFamily: "'Noto Serif', sans-serif",
    },

    p: {
        ...base_style.p,
        color: "#4f4f4f",
        fontFamily: "'Noto Serif', sans-serif",
    },
    h1: {
        ...base_style.h1,
        fontFamily: "'Noto Serif', sans-serif",
    },

    h2: {
      ...base_style.h2,
        fontFamily: "'Noto Serif', sans-serif",
    },

    h3: {
        ...base_style.h3,
        fontFamily: "'Noto Serif', sans-serif",
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#ffffff", // No background on skills tags, just text
        color: "#0056d2", // Blue text for skills
        fontFamily: "'Noto Serif', sans-serif"
    }
};
