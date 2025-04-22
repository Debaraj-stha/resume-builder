import React, { useState, useCallback, useEffect } from "react";
import { H1, H2, H3 } from "../components/elements/resumeSectionWrapper";
import styled, { useTheme } from "styled-components";
import { resumes as initialResumes } from "../static-data/resumes";
import { Button, Heading, Hspace } from "../components/CustomComponents";
import Modal from "../components/Modal";
import { BsExclamation } from "react-icons/bs";
import RoundedIcon from "../components/RoundedIcon";
import ClassicalLayout1 from "../components/layouts/classic/ClassicalLayout1";
import ScrollableModal from "../components/ScrollableModal";
import ResumeTable from "../components/ResumeTable";

const UtilityHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchBox = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;
const DashboardComponent = () => {
    const theme = useTheme();
   



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
    const handleSearchQuery = useCallback((e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = resumes.filter((resume) =>
            resume.filename.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredResumes(filtered);
        setCurrentPage(1);
    }, [resumes]);

    const handleSort = useCallback((e) => {
        const sortOrder = e.target.value;

        const sorted = [...resumes].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredResumes(sorted);
        setCurrentPage(1);
    }, [resumes]);

    const showPreview = (resumeId) => {
        setIsPreviewShow(true)
        setPreviewResumeId(resumeId)

    }

    const closePreviewModal = useCallback(() => {
        setIsPreviewShow(false)

    }, [])
    const ResumePreview = React.memo(() => {
        return (
            <ScrollableModal onClose={closePreviewModal} header={<Heading>Resume Preview</Heading>}>
                <ClassicalLayout1 />
            </ScrollableModal>
        );
    });

    //implementing pagination


    const calculatePages = useCallback(() => {
        const totalResumes =
            filteredResumes.length > 0 ? filteredResumes.length : resumes.length;

        const totalPages = Math.ceil(totalResumes / itemsPerPage);

        const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


        setPages(pages)
    }, [resumes, filteredResumes, itemsPerPage]);


    useEffect(() => {
        calculatePages()

    }, [calculatePages])//call function on  mount or when dependency of functioni.e resume,filteredrEsume and itemsperPage changes


    //handling page changes
    const handlePageChange = (page) => {
        setCurrentPage(page);

        const source = searchQuery || filteredResumes.length > 0 ? filteredResumes : resumes;

        const firstIndex = itemsPerPage * (page - 1);
        const lastIndex = firstIndex + itemsPerPage;

        const pageResumes = source.slice(firstIndex, lastIndex);
        setCurrentPageResume(pageResumes);
    };


    //loading on page change
    useEffect(() => {
        handlePageChange(currentPage);
    }, [currentPage, resumes, filteredResumes]);
    //it call the function handlePageChange  everytime when currentpage,resume or filteredResume chnages




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


    //pages
    const PaginationPages = React.memo(() => {
        return (
            <div className="flex justify-center items-center content-center gap-3 mt-5">
                {
                    pages.map((_, index) => (
                        <Button key={index} variant={index + 1 == currentPage ? "primary" : "outline"} onClick={() => handlePageChange(index + 1)}>{index + 1}</Button>
                    ))
                }
            </div>
        )
    })


    return (
        <>
            <Hspace />
            <div className="px-6">
                <H1 color={theme.colors.text}>All Your Resumes</H1>
                <UtilityHolder>
                    <Button onClick={handleCreate} className="my-4">
                        + Create New Resume
                    </Button>
                    <SearchBox type="text"
                        value={searchQuery}
                        name="search"
                        onChange={handleSearchQuery}
                        placeholder="Search Here..."></SearchBox>
                    <SortSelect onChange={handleSort}>
                        <option>Sort By</option>
                        <option value="asc">Ascending</option>
                        <option value="dsce">Descending</option>
                    </SortSelect>
                </UtilityHolder>



                <ResumeTable />
                {/* pagination pages */}
                <PaginationPages />
            </div>
            {/* showing conformation modal before deleting  */}
            {isModalShow && renderDeleteModal()}
            {/* preview of resume */}
            {
                isPreviewShow && <ResumePreview />
            }

        </>
    );
};

export default DashboardComponent;