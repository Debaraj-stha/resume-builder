import styled from "styled-components";
export const Section = styled.section.withConfig({
  shouldForwardProp: (props) => !['marginTop', 'textAlign', 'flex'].includes(props)
})`
    color: black;
    text-align: ${(props) => props.textAlign || 'center'};
    font-weight: ${(props) => props.fontWeight || '500'};
    padding: ${(props) => props.padding || '0'};
    margin:${({margin})=>margin||"0 10px"};
    margin-top: ${(props) => props.marginTop || '0'};

    box-sizing: border-box;
  `;



export const FlexSection = styled.div`
    flex-grow: ${({ flex }) => flex || 1}; /* Default to flex-grow: 1 if no flex prop is provided */
  
    padding: 10px; 
    margin-bottom: 10px; 
    box-sizing: border-box; /* Ensures padding and border are included in the element's total width and height */
  `;

export const H1 = styled.h1.withConfig({
  shouldForwardProp: (props) => !["textAlign"].includes(props)
})`
      font-weight: ${(props) => props.fontWeight || "400"};
      font-family: ${(props) => props.fontFamily || "system-ui, Avenir, Helvetica, Arial, sans-serif"};
      font-size: ${(props) => props.fontSize || "30px"};
      color:${(props) => props.color || "black"};
      text-align:${(props) => props.textAlign || "center"};F
    `;

export const SectionContent = styled.div.withConfig({
  shouldForwardProp: (props) => !["paddingTop"].includes(props)
})`
    padding-top:${(props) => props.paddingTop || "0px"};
    `
export const H2 = styled.h2.withConfig({
  shouldForwardProp: (props) => !["fontFamily", "textAlign"].includes(props)
})`
    font-weight:${(props) => props.fontWeight || "bold"};
    font-size:${(props) => props.fontSize || "18px"};
    color:${(props) => props.color || "black"};
    font-family:${({ fontFamily }) => fontFamily};
    text-align:${({ textAlign }) => textAlign || "left"};
    
    `
export const H3 = styled.h3.withConfig({
  shouldForwardProp: (props) => !['marginTop', 'textAlign'].includes(props)
})`
    font-weight:${(props) => props.fontWeight || "600"};
    font-family:${({ fontFamily }) => fontFamily};
    font-size:${(props) => props.fontSize || "15px"};
    text-align:${(props) => props.textAlign || "center"};
     color:${(props) => props.color || "black"};
    `
export const Ul = styled.ul.withConfig({
  shouldForwardProp: (props) => !["alignItems", 
    "alignContent",
     "flexWrap",
    "listStyleType",
     "justifyContent", 
    "listStyle", 
    "listStylePosition",
     "textAlign"
    ].includes(props)
})`
    display: ${(props) => props.display || "flex"};
    list-style: ${(props) => props.listStyle || "disc"};
    flex-wrap:wrap;
    align-items: ${(props) => props.alignItems || "center"};
    justify-content: ${(props) => props.justifyContent || "center"};
    font-weight: ${(props) => props.fontWeight || "normal"};
    gap: ${(props) => props.gap || "10px"};
    list-style-position:${(props) => "inside"};
    margin:${(props) => props.margin || "10px 0 0 0"};
    padding:${(props) => props.padding || "0"};
    text-align:${({ textAlign }) => textAlign || "left"}
  `;
export const Li = styled.li.withConfig({
  shouldForwardProp: (props) => !["alignItems", "justifyContent", "textAlign", "alignContent", "iconColor"].includes(props)
})`
    font-weight:${(props) => props.fontWeight || "normal"};
    font-size:${(props) => props.fontSize || "12px"};
    display:${(props) => props.display || "list-item"};
    justify-content:${(props) => props.justifyContent || "start"};
    align-items:${(props) => props.alignItems || "start"};
    color:${(props) => props.color || "#444"};
    position:relative;
    // padding-left: 10px;
   
  }
    `

// flex list-disc  items-center content-center justify-center gap-5 font-normal

export const P = styled.p.withConfig({
  shouldForwardProp: (props) => !['marginTop', 'textAlign'].includes(props)
})`
    font-weight:${(props) => props.fontWeight || "normal"};
    font-size:${(props) => props.fontSize || "15px"};
    text-align:${(props) => props.textAlign || "left"};
    color:${(props,theme) => props.color ||props.theme.colors.text };
    `

export const InnerContentWrapper = styled.div.withConfig({
  shouldForwardProp: (props) => !["justifyContent"].includes(props)
})`
    display:flex;
    justify-content:${(props) => props.justifyContent || "space-between"};
    `


export const FlexCard = styled.div.withConfig({
  shouldForwardProp: (props) => !["justifyContent"].includes(props)
})`
display:flex;
justify-content:${(props) => props.justifyContent || "start"};
margin:${(props) => props.margin || "0 5px 0 0"};
gap:${(props) => props.gap || "10px"};
// align-items:center;
`
export const IconHolder = styled.div.withConfig({
  shouldForwardProp: (props) => !["backgroundColor", "borderRadius", "shouldBoxShadow"].includes(props)
})`
margin:${(props) => props.margin || "0 5px 0 0"};
background-color:${(props) => props.backgroundColor || "transparent"};
padding:${(props) => props.padding || "0"};
border-radius:${(props) => props.borderRadius || "0"};
box-shadow:${(props) => props.shouldBoxShadow ? "5px 5px 10px rgba(0,0,0,.6)" : null};
`
export const CircularIconHolder = styled(IconHolder)`
  background-color:${({ backgroundColor }) => backgroundColor || "#324f22"};
  border-radius:50%;
  padding:10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
`
export const SkillCardWrapper = styled.div`
display:flex;
justify-content:space-between;
`
export const SkillCardItemsWrapper = styled.div`
display:flex;
justify-content:space-between;
gap:10px;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  margin:5px 0;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const LeftColumn = styled.div.withConfig({
  shouldForwardProp: (props) => !["backgroundColor"].includes(props)
})`
  flex: ${({ flex }) => flex || "3"};
  background-color:${({ backgroundColor }) => backgroundColor || "#fff"};
  padding:${({ padding }) => padding || "40px 20px 40px 40px"};
`;
export const RightColumn = styled.div.withConfig({
  shouldForwardProp: (props) => !["backgroundColor"].includes(props)
})`
  flex: ${({ flex }) => flex || "2"};
  background-color:${({ backgroundColor }) => backgroundColor || "#1c2a45"};
  color: #fff;
  padding:${({ padding }) => padding || "20px 40px 20px 20px"};
  min-height:297mm;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px; 
`;
