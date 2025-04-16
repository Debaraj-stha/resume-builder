import React from "react";
import styled, { useTheme } from "styled-components";    
import ToolTip from "./Tooltip";
import { Button } from "./CustomComponents";
import { BiDownload, BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useDashboard } from "../provider/DashboardProvider";


// Styled components
const StyledTh = styled.th`
padding: 10px 15px;
border: 1px solid ${({ theme }) => theme.colors.border};
text-align: center;
`;


const StyledTD = styled.td`
padding: ${({ padding }) => padding || "10px 15px"};
border: 1px solid ${({ theme }) => theme.colors.border};
text-align: center;
`;

const StyledRow = styled.tr.withConfig({
  shouldForwardProp: (prop) => !["isEven"].includes(prop),
})`
  background-color: ${({ isEven, theme }) =>
          isEven ? theme.colors.tableRowEvenBg : theme.colors.tableRowOddBg};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s ease;

  &:hover {
      background-color: ${({ theme }) => theme.colors.tableRowHoverBg};
  }
`;
    //render only when props to this function changes
    const ResumeRow = React.memo(({ resume, index})=>{
        const{
            handleEdit,
            confirmDelete,
            showPreview
          }=useDashboard()
        return (
            <StyledRow key={index} isEven={index % 2 === 0}>
                <StyledTD scope="row">{index + 1}</StyledTD>
                <StyledTD>{resume.filename}</StyledTD>
                <StyledTD>
                    {new Date(resume.createdAt).toLocaleString()}
                </StyledTD>
                <StyledTD>
                    <div className="flex items-center justify-center gap-2">
                        <ToolTip text="Download">
                            <Button>
                                <BiDownload />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Edit">
                            <Button variant="outline" onClick={() => handleEdit(resume.id)}>
                                <BiEdit />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Delete">
                            <Button variant="danger" onClick={() => confirmDelete(resume.id)}>
                                <FiDelete />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Preview">
                            <Button variant="secondary" onClick={()=>showPreview(resume.id)}><BsEye/></Button>
                        </ToolTip>
                    </div>
                </StyledTD>
            </StyledRow>
        )
    })

const ResumeTable = () => {
    const {
        theme,
        currentPageresume
    }=useDashboard()
    return (
        <div className="mt-5 overflow-x-auto">
            <table
                className="w-full border-collapse rounded-lg overflow-hidden"
                style={{ border: `1px solid ${theme.colors.border}` }}
            >
                <thead
                    style={{
                        backgroundColor: theme.colors.tableHeaderBg,
                        color: theme.colors.tableHeaderText,
                    }}
                >
                    <tr>
                        <StyledTh>#</StyledTh>
                        <StyledTh>Resume</StyledTh>
                        <StyledTh>Last Edited</StyledTh>
                        <StyledTh>Actions</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {
                        //if there is filtered resume show it otherwise all resume
                        currentPageresume.map((resume, index) => (
                            <ResumeRow key={index} resume={resume} index={index} />
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default ResumeTable