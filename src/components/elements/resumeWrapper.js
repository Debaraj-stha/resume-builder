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
export const ResumeInputFieldWrapper=styled.div`
 width: 210mm;
  padding: 20mm;
  background: white;
  margin:10px auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`
export const ResumesWrapperDiv=styled.div`
width: 210mm;
`

export const LayoutWrapperWithBorder=styled.div`
border:1px solid ${({theme})=>theme.colors.border};
min-height:297mm;
`