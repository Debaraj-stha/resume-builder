import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import ToolTip from "./Tooltip";
import { Button } from "./CustomComponents";
import { BiDownload, BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useDashboard } from "../provider/DashboardProvider";
import { usePagination } from "../provider/paginationProvider";
import ProgressBarModal from "./ModalWithProgressBar";


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
const ResumeRow = React.memo(({ resume, index }) => {

    const [downloadProgress, setDownloadProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const {
        handleEdit,
        confirmDelete,
        showPreview
    } = useDashboard()

    const download = (url, filename) => {
        setDownloading(true);
        setDownloadProgress(0);

        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";

        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setDownloadProgress(percent);
            }
        };

        xhr.onload = () => {
            const blob = new Blob([xhr.response]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = filename || "file.pdf";
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            setDownloading(false);
        };

        xhr.onerror = () => {
            console.error("Download failed");
            setDownloading(false);
        };

        xhr.open("GET", url);
        xhr.send();
    };

    return (
        <>
            <StyledRow key={index} isEven={index % 2 === 0}>
                <StyledTD scope="row">{index + 1}</StyledTD>
                <StyledTD>{resume.name}</StyledTD>
                <StyledTD>
                    {new Date(resume.last_accessed_at).toLocaleString()}
                </StyledTD>
                <StyledTD>
                    {new Date(resume.created_at).toLocaleString()}
                </StyledTD>
                <StyledTD>
                    <div className="flex items-center justify-center gap-2">
                        <ToolTip text="Download">
                            <Button onClick={() => download(resume.url, resume.name)}>
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
                            <Button variant="secondary" onClick={() => showPreview(resume.id)}><BsEye /></Button>
                        </ToolTip>
                    </div>
                </StyledTD>
            </StyledRow>
            {
                downloading && <ProgressBarModal progress={downloadProgress} message="Downloading Resume..." />
            }
        </>
    )
})

const ResumeTable = () => {
    const {

        resumes,
        filteredResumes
    } = useDashboard()
    const theme = useTheme()
    const { itemPerPage, currentPage } = usePagination()
    const currentReumes = filteredResumes.length > 0 ? filteredResumes : resumes
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
                        <StyledTh>Last Accessed AT</StyledTh>
                        <StyledTh>Created At</StyledTh>
                        <StyledTh>Actions</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {
                        //if there is filtered resume show it otherwise all resume
                        currentReumes.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((resume, index) => (
                            <ResumeRow key={index} resume={resume} index={index} />
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default ResumeTable