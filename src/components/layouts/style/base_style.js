const base_style = {
   main_style:{
    primaryColor: "#000000", // Black used for name and section titles
    fontFamily: "'Roboto', sans-serif", // Clean modern sans-serif font
    backgroundColor: "#ffffff",
    sidebarBackgroundColor: "#ffffff",
    sidebarTextColor: "#000000",
    headerBackground: "#ffffff",
    textColor: "#333333", // Dark gray for body text
    subTextColor: "#555555", // Slightly lighter gray for secondary text
    accentColor: "#000000", // Used in section dividers and headings
   },
    nameStyle: {
        fontSize: "22px",
        fontWeight: "700",
        fontFamily: "'Georgia', serif",
        color: "#000000",
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom:"4px"
    },

    titleStyle: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#555555",
        letterSpacing: "0.5px",
        textAlign: "center",
    },

    profile_ul: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyleType: "none",
        gap: "12px",
        padding: "0",
        margin: "6px 0 12px",
        alignContent: "center",
    },

    profile_li: {
        fontSize: "12px",
        color: "#333333",
        padding: "0 8px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        iconColor: "#555555",
        alignContent: "center",
    },

    sectionHeader: {
        fontSize: "13px",
        fontWeight: "700",
        color: "#000000",
        textTransform: "uppercase",
        paddingBottom: "4px",
        marginBottom: "4px",
        textAlign:"left"
    },

    sectionSubHeader: {
        fontSize: "12px",
        fontWeight: "600",
        color: "#000000",
        margin: "0 0 4px",
        textAlign: "left"
    },

    p: {
        fontSize: "11px",
        lineHeight: "1.6",
        color: "#555555",
        textAlign: "left",
        margin: "2px 0"
    },

    h1: {
        fontSize: "16px",
        fontWeight: "700",
        color: "#000000",
        textAlign: "left",
        margin: "6px 0"
    },

    h2: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#000000",
        textAlign: "left",
        margin: "4px 0"
    },

    h3: {
        fontSize: "12px",
        fontWeight: "500",
        color: "#000000",
        textAlign: "left",
        margin: "2px 0"
    },

    tagStyle: {
        backgroundColor: "#f2f2f2",
        color: "#000000",
        fontSize: "10px",
        padding: "3px 8px",
        borderRadius: "10px",
        display: "inline-block",
        margin: "2px",
    },

    progressBar: {
        backgroundColor: "#e0e0e0",
        fillColor: "#000000",
        height: "4px",
        borderRadius: "2px",
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

export default base_style