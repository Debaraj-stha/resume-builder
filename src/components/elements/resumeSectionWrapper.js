import styled from "styled-components";
export const Section = styled.section.withConfig({
    shouldForwardProp: (props) => !['marginTop', 'textAlign'].includes(props)
})`
    color:black;
    text-align:${(props) => props.textAlign || "center"};
    font-weight:${(props) => props.fontWeight || "500"};
    padding:${(props) => props.padding || "0"};
    margin-top:${(props) => props.marginTop || "0"};
    `
export const H1 = styled.h1.withConfig({
    shouldForwardProp: (props) => !["textAlign"].includes(props)
})`
      font-weight: ${(props) => props.fontWeight || "400"};
      font-family: ${(props) => props.fontFamily || "system-ui, Avenir, Helvetica, Arial, sans-serif"};
      font-size: ${(props) => props.fontSize || "30px"};
      color:${(props) => props.color || "black"};
      text-align:${(props) => props.textAlign || "center"};F
    `;

export const SectionContent = styled.div`
    padding-top:${(props) => props.paddingTop || "10px"};
    `
export const H2 = styled.h2`
    font-weight:${(props) => props.fontWeight || "bold"};
    font-size:${(props) => props.fontSize || "18px"};
    color:${(props) => props.color || "black"};
    
    `
export const H3 = styled.h3.withConfig({
    shouldForwardProp: (props) => !['marginTop', 'textAlign'].includes(props)
})`
    font-weight:${(props) => props.fontWeight || "600"};
    font-size:${(props) => props.fontSize || "15px"};
    text-align:${(props) => props.textAlign || "center"};
     color:${(props) => props.color || "black"};
    `
export const Ul = styled.ul.withConfig({
    shouldForwardProp: (props) => !["alignItems", "justifyContent", "listStyle","listStylePosition"].includes(props)
})`
    display: ${(props) => props.display || "flex"};
    list-style: ${(props) => props.listStyle || "disc"};
    align-items: ${(props) => props.alignItems || "center"};
    justify-content: ${(props) => props.justifyContent || "center"};
    font-weight: ${(props) => props.fontWeight || "normal"};
    gap: ${(props) => props.gap || "30px"};
    list-style-position:${(props)=>props.listStylePosition||"inside"};
    margin:${(props) => props.margin || "10px 0 0 0"};
    padding:${(props) => props.padding || "0"};
  `;

// flex list-disc  items-center content-center justify-center gap-5 font-normal

export const P = styled.p.withConfig({
    shouldForwardProp: (props) => !['marginTop', 'textAlign'].includes(props)
})`
    font-weight:${(props) => props.fontWeight || "normal"};
    font-size:${(props) => props.fontSize || "15px"};
    text-align:${(props) => props.textAlign || "left"};
    color:${(props) => props.color || "#444"};
    `
export const Li = styled.li.withConfig({
    shouldForwardProp: (props) => !["alignItems", "justifyContent"].includes(props)
})`
    font-weight:${(props) => props.fontWeight || "normal"};
    font-size:${(props) => props.fontSize || "12px"};
    display:${(props) => props.display || "bloxk"};
    justify-content:${(props) => props.justifyContent || "start"};
    align-items:${(props) => props.alignItems || "start"};
    color:${(props) => props.color || "#444"};
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
align-items:center;
`
export const IconHolder = styled.div.withConfig({
    shouldForwardProp: (props) => !["backgroundColor", "borderRadius","shouldBoxShadow"].includes(props)
})`
margin:${(props) => props.margin || "0 5px 0 0"};
background-color:${(props) => props.backgroundColor || "transparent"};
padding:${(props) => props.padding || "0"};
border-radius:${(props) => props.borderRadius || "0"};
box-shadow:${(props)=>props.shouldBoxShadow  ? "5px 5px 10px rgba(0,0,0,.6)":null };
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
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.border};
  }
`;

