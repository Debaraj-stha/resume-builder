import { Link } from "react-router-dom";
import styled from "styled-components";

const Hspace=styled.div`
height:${({height})=>height||"130px"};
width:100%;
margin-bottom:30px;
`
export  {Hspace}


export const StyledNavLink = styled(Link).withConfig({
    shouldForwardProp:(props)=>!["isBanner"].includes(props)
})`
  color: ${({ theme,isBanner }) => isBanner ? theme.colors.bannerText: theme.colors.navText};
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme ,isBanner}) => isBanner ? theme.colors.bannerHoverText:theme.colors.navHoverText};
  }
`;



export const Button = styled.button.withConfig({
  shouldForwardProp:(props)=>!["variant","backgroundColor","borderColor"].includes(props)
})`
  display:${({display})=>display||"block"};
  justify-content:space-between;
  align-items:center;
  gap:10px;
  overflow;hidden;
  background-color: ${({ backgroundColor, theme, variant = 'primary' }) => backgroundColor|| theme.colors.button[variant].bg};
  color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].text};
  border: 1px solid ${({ borderColor,theme, variant = 'primary' }) => borderColor||theme.colors.button[variant].border};
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin:${({margin})=>margin||"10px"};

  &:hover {
    background-color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].hoverBg};
    color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].hoverText};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.disabled.bg};
    color: ${({ theme }) => theme.colors.button.disabled.text};
    border-color: ${({ theme }) => theme.colors.button.disabled.border};
    cursor: not-allowed;
  }
`;

export const CTA = styled.section`
background-color: ${({ theme }) => theme.colors.card.background};
text-align: center;
padding: 4rem 1.5rem;
border: 1px solid ${({ theme }) => theme.colors.card.border};
border-radius:10px;
box-shadow: 0 2px 6px ${({ theme }) => theme.colors.card.shadow};
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }) => theme.colors.card.hoverBackground};
  }
`

;

export const CTAButton = styled.button`
background: ${({ theme }) => theme.colors.card.background};
font-weight: 600;
padding: 0.75rem 2rem;
border-radius: 6px;
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
margin-top: 1.5rem;
cursor: pointer;
transition: background 0.3s;

&:hover {
  background: #edf2f7;
  color:${({theme})=>"black"}
}
`;
export const Heading = styled.h2`
color: ${({ theme }) => theme.colors.accent};
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
export const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.card.background};
  color: ${({ theme }) => theme.colors.card.text};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors.card.shadow};
  transition: transform 0.3s ease;
  overflow:hidden;

  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }) => theme.colors.card.hoverBackground};
  }

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  p {
    margin: 0;
  }
`;
export const Intro = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: 4rem 1.5rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Subtitle = styled.p`
  max-width: 40rem;
  margin: 0 auto;
  font-size: 1.125rem;
`;

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;



export const Text = styled.p`
  line-height: 1.6;
`;

export const Features = styled.section`
  padding: 4rem 1.5rem;
  text-align: center;
`;

export const FeatureGrid = styled.div.withConfig({
  shouldForwardProp:(props)=>!["minmax"].includes(props)
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${({minmax})=>minmax||"200px"}, 1fr));
  gap: 2rem;
  max-width: 1100px;
  margin: ${({margin})=>margin||"0 auto"};
`;



export const Team = styled.section`
  padding: 4rem 1.5rem;
  text-align: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

export const TeamMember = styled.div`
  background-color: ${({ theme }) => theme.colors.card.background};
  color: ${({ theme }) => theme.colors.card.text};
  border-radius: 12px;
  padding: 1.5rem;
border: 1px solid ${({ theme }) => theme.colors.card.border};
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors.card.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }) => theme.colors.card.hoverBackground};
  }

  h4 {
    margin: 1rem 0 0.25rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.accent + '20'};
  border-radius: 50%;
  overflow: hidden;
  margin: ${({margin})=>margin||"0 auto 1rem"};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ErrorParagraph=styled.p`
color:${({theme})=>theme.colors.error};
font-size:15px;
margin:0;
padding:0;
text-align:left;
`
export const H1=styled.h1`
color:${({theme})=>theme.colors.text||"black"};
`
export const H2=styled.h2`
color:${({theme,color})=>color||theme.colors.text||"black"};
font-size:22px;
margin:10px auto;
`
export const H3=styled.h3`
color:${({theme,color})=>color||theme.colors.text||"black"};
font-size:18px;
`
export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  margin:5px;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.accent};
  }
`;
export const Paragraph=styled.p`
color:${({theme})=>theme.colors.accent||"black"};
font-size:15px;
margin:10px 0;
font-weight:600;
font-family:"Poppins",sans-serif;
`

export const DynamicInputSectionWrapper=styled.div`
border:1px solid ${({theme})=>theme.colors.border};
margin:${({margin})=>margin||"15px 0"};
padding:${({padding})=>padding||"5px"};
border-radius:10px;
`
export const VerticalPinSeparator=styled.div`
background:black;
width:2px;
height:100%;
position:relative;
&:before{
content:"";
position:absolute;
top:0;
left:-4px;
width:10px;
height:10px;
border-radius:50%;
background:black;
}
`

export const FlexBox=styled.div.withConfig({
  shouldForwardProp:(props)=>!["justifyContent","alignItems","flexWrap","backgroundColor","flexDirection","alignContent"].includes(props)
})`
display:${({display})=>display||"flex"};
gap:${({gap})=>gap||"10px"};
align-items:${({alignItems})=>alignItems||"normal"};
margin:${({margin})=>margin||"10px 0 0 0"};
justify-content:${({justifyContent})=>justifyContent||"start"};
padding:${({padding})=>padding||"0"};
flex-wrap:${({flexWrap})=>flexWrap||"nowrap"};
background-color:${({backgroundColor})=>backgroundColor||"transparent"};
flex-direction: ${({flexDirection})=>flexDirection||"row"};
align-content: ${({alignContent})=>alignContent||"center"};


`
export const ColumnFlexBox=styled(FlexBox).withConfig({
  shouldForwardProp:(props)=>!["flexDirection"].includes(props)
})`
flex-direction:${({flexDirection})=>flexDirection||"column"};
gap:${({gap})=>gap||"10px"};
`
export const GridBox = styled.div`
  display: flex;
  flex-wrap: wrap;       // allows items to break to the next line
  gap: 10px;             // spacing between items

`;

export const BorderBox = styled.div.withConfig({
  shouldForwardProp:(props)=>!["borderRadius","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","borderColor"].includes(props)
})`
border:1px solid;
border-radius:${({borderRadius})=>borderRadius||"1px"};
padding:${({padding})=>padding||"0 5px 0 0"};
margin:${({margin})=>margin||"5px"};
border-top-color:${({borderColor,borderTopColor})=>borderColor||borderTopColor||"transparent"};
border-bottom-color:${({borderColor,borderBottomColor})=>borderColor||borderBottomColor||"transparent"};
border-left-color:${({borderColor,borderLeftColor})=>borderColor||borderLeftColor||"transparent"};
border-right-color:${({borderColor,borderRightColor})=>borderColor||borderRightColor||"transparent"};
border-radius:${({borderRadius})=>borderRadius||"0"};
`;

export const GridPairBox=styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  gap: 1.25rem; /* gap-5 = 20px */
  // /* Responsive: change to row on medium screens and up */
  // @media (min-width: 768px) {
  //   flex-direction: row;
  // }


`
export const CardWrapper=styled.div`
border:1px solid ${({theme})=>theme.colors.card.border};
border-radius:10px;
padding:10px;
margin:10px;
`
export const CloseButton=styled.button`
background:red;
opacity:0.6;
border-radius:8px;
padding:10px 20px;
border:none;
color:${({theme})=>theme.colors.text};
cursor:pointer;
transition: all 0.3s ease-in-out;
&:hover{
    opacity:1;
}
`