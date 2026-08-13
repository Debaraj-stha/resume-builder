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
        <article className="resume-card">
            <button className="resume-thumbnail" onClick={() => showPreview(resume.id)} aria-label={`Preview ${resume.name}`}>
                <iframe src={`${resume.url}#toolbar=0&navpanes=0`} title={resume.name} tabIndex="-1" />
                <span><BsEye /> Preview PDF</span>
            </button>
            <div className="resume-card-body"><span className="resume-number">RESUME {index + 1}</span><h3>{resume.name?.replace(/\.pdf$/i, "")}</h3><p>Created {new Date(resume.created_at).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}</p></div>
            <div className="resume-card-actions">
                <Button onClick={() => download(resume.url, resume.name)}><BiDownload /> Download</Button>
                <ToolTip text="Use another template"><Button variant="outline" onClick={() => handleEdit(resume.id)}><BiEdit /></Button></ToolTip>
                <ToolTip text="Delete"><Button variant="danger" onClick={() => confirmDelete(resume.id)}><FiDelete /></Button></ToolTip>
            </div>
            {
                downloading && <ProgressBarModal progress={downloadProgress} message="Downloading Resume..." />
            }
        </article>
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
        <div className="resume-card-grid">
            {currentReumes.length === 0 && <div className="resume-empty"><div><BiEdit /></div><span>YOUR FIRST CV STARTS HERE</span><h3>Create a resume tailored to your profession</h3><p>Choose from ATS-friendly templates designed for technology, healthcare and business roles.</p><Button onClick={() => handleEdit()}>Explore professional templates</Button></div>}
            {
                        //if there is filtered resume show it otherwise all resume
                        currentReumes.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((resume, index) => (
                            <ResumeRow key={index} resume={resume} index={index} />
                        ))
            }
        </div>
    )
}
export default ResumeTable
