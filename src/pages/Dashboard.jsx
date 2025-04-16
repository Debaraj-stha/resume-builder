import React, { useState, useCallback } from "react";
import { H1, H2, H3 } from "../components/elements/resumeSectionWrapper";
import styled, { useTheme } from "styled-components";
import { resumes as initialResumes } from "../sttaic-data/resumes";
import { Button, Hspace } from "../components/CustomComponents";
import { BiDownload, BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import ToolTip from "../components/Tooltip";
import Modal from "../components/Modal";
import { BsExclamation } from "react-icons/bs";
import RoundedIcon from "../components/RoundedIcon";



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

const Dashboard = () => {
    const theme = useTheme();
    const [resumes, setResumes] = useState(initialResumes);
    const [isModalShow, setIsModalShow] = useState(false);
    const [selectedResumeId, setSelectedResumeId] = useState(null);

    const handleDelete = useCallback(() => {
        setResumes(resumes.filter((resume) => resume.id !== selectedResumeId));
        setIsModalShow(false);
        setSelectedResumeId(null);
    }, []);

    const handleEdit = useCallback((id) => {
        alert(`Edit resume with ID: ${id}`);
    }, []);

    const handleCreate = () => {
        const newResume = {
            id: Date.now(),
            createdAt: new Date(),
            filename: `New Resume ${resumes.length + 1}`,
            url: "",
        };
        setResumes([newResume, ...resumes]);
    };
    //conforming before deleting 
    const confirmDelete = (id) => {
        //storing resume id for later use
        setSelectedResumeId(id);
        setIsModalShow(true);
    };

    const closeModal = useCallback(() => {
        setIsModalShow(false)
      
    }, [])

    const renderDeleteModal = () => (
        <Modal
            footer={
                <div className="flex justify-between">
                    <Button variant="ghost" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Ok
                    </Button>
                </div>
            }
            onClose={closeModal}
        >
            <div className="flex items-center justify-center my-3 gap-4">
                <RoundedIcon background="green">
                    <BsExclamation
                        color={theme.colors.icons?.default?.colors || "#fff"}
                        size={60}
                    />
                </RoundedIcon>
                <H1>Confirm</H1>
            </div>
            <H2>Are you sure you want to delete this resume?</H2>
            <H3 fontSize="16px" fontWeight="500">This action cannot be undone.</H3>
        </Modal>
    );

    return (
        <>
            <Hspace />
            <div className="px-6">
                <H1 color={theme.colors.text}>All Your Resumes</H1>
                <Button onClick={handleCreate} className="my-4">
                    + Create New Resume
                </Button>
              

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
                            {resumes.map((resume, index) => (
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
                                        </div>
                                    </StyledTD>
                                </StyledRow>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* showing conformation modal before deleting  */}
            {isModalShow && renderDeleteModal()}
        </>
    );
};

export default Dashboard;
