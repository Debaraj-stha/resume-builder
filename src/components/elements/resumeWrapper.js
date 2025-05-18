import styled from "styled-components";

export const ResumeWrapper = styled.div`
  width: 210mm;
  height: 297mm;
  padding:${({ padding }) => padding || "20mm"};
  background: white;
  margin:10px auto;
  overflow:hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  @media print {
    margin: 0;
    box-shadow: none;
  }
`;


export const CreativeResumeWrapper1 = styled(ResumeWrapper)`
  position: relative;
  overflow: hidden;
  padding: 0;

  // Pseudo-elements
  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 80px;
    height: 80px;
    z-index: 2;
  }

  &::after {
    bottom: 0;
    left: 18px;
    border-radius: 50%;
    border: 3px solid;
    border-color: white white transparent white;
    transform: translateY(50%);
    z-index:12;
  }

  &::before {
    top: 0;
    right: 18px;
    border-radius: 50%;
    border: 3px solid;
    border-color: transparent white white white;
    transform: translateY(-50%);
  }

  // Curves
  .top-curve,
  .bottom-curve {
    position: absolute;
    width: 100%;

  }

  .top-curve {
  z-index:1;
    top: -20px;
  }

  .bottom-curve {
    bottom: -20px;
    z-index:11; /* Lower z-index to keep behind */
  }

  .top-curve img,
  .bottom-curve img {
    width: 100%;
    height: auto;
    display: block;
  }
`;


export const CreativeResumeWrapperWithLine = styled(ResumeWrapper)`
  position: relative;
  &::before,
  &::after{
    content: "";
    position: absolute;
    width: 7px;
    background-color: red; /* first vertical line */
    box-shadow:
      15px 0 blue,
      30px 0 green,
      45px 0 orange,
      60px 0 purple,
      75px 0 teal;
      
      z-index: 1;
    }

  &::before {
    top: -93px;
    right: 87px;
    height: 175px;
    transform:rotate(22deg);
  }

  &::after {
    bottom: 0;
    left: 10px;
    height: 70px;
    background-color: gray;
  }
`;



export const ModernResumeWrapper = styled(ResumeWrapper)`
padding:${({ padding }) => padding || "20px 0 20px 20px"};
`
export const ResumeInputFieldWrapper = styled.div`
  width: 210mm;
  padding: ${({padding})=>padding||"20mm"};
  background: white;
  margin:${({margin})=>margin||"10px auto"};
  height:${({height})=>height||"290mm"};
  overflow-y:scroll;

  box-shadow: 0 0 5px ${({ theme }) => theme.colors.card.shadow || "rgba(0, 0, 0, 0.1)"};
  background: ${({ theme }) => theme.colors.card.background || "red"};
  transition: all 0.3s ease;
  // &:hover{
  //   background: ${({ theme }) => theme.colors.card.hoverBackground || "rgba(0, 0, 0, 0.4)"};
    
  // }
}
`
export const ResumesWrapperDiv = styled.div`
width: 210mm;

`

export const LayoutWrapperWithBorder = styled.div`
border:1px solid ${({ theme }) => theme.colors.border};
min-height:297mm;
padding:${({padding})=>padding ||"20px 0px"} ;
border-radius:10px;
`


export const FlexResumeWrapper = styled(ResumeWrapper)`
  display: flex;
  padding:0;
`;


