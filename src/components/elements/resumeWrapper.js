import styled from "styled-components";

export const ResumeWrapper = styled.div`
  width: 210mm;
  height: 297mm;
  padding: 20mm;
  background: white;
  margin:10px auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  @media print {
    margin: 0;
    box-shadow: none;
  }
`;
export const ModernResumeWrapper=styled(ResumeWrapper)`
padding:${({padding})=>padding||"20px 0 20px 20px"};
`
export const ResumeInputFieldWrapper=styled.div`
 width: 210mm;
  padding: 20mm;
  background: white;
  margin:10px auto;
  box-shadow: 0 0 5px ${({theme})=>theme.colors.card.shadow||"rgba(0, 0, 0, 0.1)"};
  background: ${({theme})=>theme.colors.card.background||"red"};
  transition: all 0.3s ease;
  // &:hover{
  //   background: ${({theme})=>theme.colors.card.hoverBackground||"rgba(0, 0, 0, 0.4)"};
    
  // }
}
`
export const ResumesWrapperDiv=styled.div`
width: 210mm;

`

export const LayoutWrapperWithBorder=styled.div`
border:1px solid ${({theme})=>theme.colors.border};
min-height:297mm;
padding:20px 0px;
`


export const FlexResumeWrapper = styled(ResumeWrapper)`
  display: flex;
  border: 1px solid #ccc;
  font-family: 'Segoe UI', sans-serif;
  padding:0;
`;


