import base_style from "../../style/base_style";
export const layout_1_style = {
    ...base_style.main_style,
    primaryColor: "#1a355b", // Deep blue used for sidebar and highlights
    sidebarBackgroundColor: "#1a355b",
    sidebarTextColor: "#ffffff",
    accentColor: "#1a355b",
    nameStyle: {
        ...base_style.nameStyle,
        fontSize: "30px",
        fontFamily: "'Open Sans', sans-serif",
        color: "#1a355b",
        textAlign: "left"
    },
    titleStyle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "blue",
        letterSpacing: "0px",
        textAlign: "left",
    },
    profile_ul: {
        ...base_style.profile_ul,
        justifyContent: "start",
        flexWrap: "wrap",
        listStyleType: "none",
        listStylePosition: "inside",
        gap: "5px"
    },
    profile_li: {
        ...base_style.profile_li,
        color: "#000000",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        iconColor: "#000"
    },
    sectionHeader: {
        ...base_style.sectionHeader,
        color: "#1a355b",
    },
    sectionSubHeader: {
        ...base_style.sectionSubHeader,
        color: "blue",
        textAlign: "left"
    },
    p: {
        ...base_style.p,
        color: "#555555",
    },
    h1: {
        ...base_style.h1,
        color: "#333333",
    },
    h2: {
        ...base_style.h2,
        color: "#333333",
    },
    h3: {
        ...base_style.h3,
        color: "#333333",
    },

    tagStyle: {
        ...base_style.tagStyle,
        backgroundColor: "#e6ecf5",
        color: "#1a355b",
    },
    progressBar: {
        backgroundColor: "#d9d9d9",
        fillColor: "#1a355b",
        height: "4px",
        borderRadius: "2px",
    },
    barStyle: {
        ...base_style.barStyle
    }

};
