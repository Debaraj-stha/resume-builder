    const nameStyle = {
        font: { style: 'bold' },
        fontSize: 25,
        color: [0, 0, 0],
        fillColor: [50, 50, 150],
        align: 'center'
    };
    const headerStyle = {
        ...nameStyle,
        fontSize: 18,
        align: "center"
    }
    const subHeaderStyle = {
        ...nameStyle,
        fontSize: 16,
        align: "center",
        font:{style:"normal"}
    }
    const subsubHeaderStyle = {
        ...nameStyle,
        fontSize: 14,
        align: "left",
        
        font: { style: "normal" }
    }
    const normalStyle = {
        color: [0, 0, 0],
        font: { family: "times", style: "normal" },
        fontSize: 12
    }
    export {headerStyle, subHeaderStyle, subsubHeaderStyle, normalStyle, nameStyle};