// Define a general base style
const baseStyle = {
  color: [0, 0, 0],
  font: { family: "times", style: "normal" },
  fontSize: 12,
  align: "left",
};

// Name style overrides the base style
const nameStyle = {
  ...baseStyle,
  font: { ...baseStyle.font, style: "bold" },
  fontSize: 25,
  fillColor: [50, 50, 150],
  align: "center",
};

// Header styles build on nameStyle
const headerStyle = {
  ...nameStyle,
  fontSize: 18,
};

const subHeaderStyle = {
  ...nameStyle,
  fontSize: 16,
  font: { ...nameStyle.font, style: "bold" },
};

const subSubHeaderStyle = {
  ...nameStyle,
  fontSize: 14,
  align: "left",
  font: { family: "times", style: "normal" },
};

// Normal paragraph text
const normalStyle = {
  ...baseStyle,
};

export const defaultSectionStyle = {
  baseStyle,
  nameStyle,
  headerStyle,
  subHeaderStyle,
  subSubHeaderStyle,
  normalStyle,
};
