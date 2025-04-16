import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useTheme } from "styled-components";
import { resumes as initialResumes}   from "../sttaic-data/resumes";
const DashboardContext = createContext()

const DashboardProvider = ({ children }) => {
    const theme = useTheme()
    const [currentPageresume, setCurrentPageResume] = useState([])
    const [resumes, setResumes] = useState(initialResumes);
    const [isModalShow, setIsModalShow] = useState(false);
    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResumes, setFilteredResumes] = useState([])
    const [pages, setPages] = useState([])
    const itemsPerPage = 3
    const [currentPage, setCurrentPage] = useState(1)
    const [isPreviewShow, setIsPreviewShow] = useState(false)
    const [previewResumeId, setPreviewResumeId] = useState(null)



    const handleDelete = useCallback(() => {
        setResumes(resumes.filter((resume) => resume.id !== selectedResumeId));
        setIsModalShow(false);
        setSelectedResumeId(null);
    }, [setResumes,setIsModalShow,setSelectedResumeId]);

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
    const confirmDelete = useCallback((id) => {
        //storing resume id for later use
        setSelectedResumeId(id);
        setIsModalShow(true);
    }, [isModalShow, selectedResumeId]);

    const closeModal = useCallback(() => {
        console.log("called")
        setIsModalShow(false)

    }, [setIsModalShow])
    const handleSearchQuery = useCallback((e) => {
        const query = e.target.value;
        console.log("filtering ",query)
        setSearchQuery(query);

        const filtered = resumes.filter((resume) =>
            resume.filename.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredResumes(filtered);
        setCurrentPage(1);
        
    }, [resumes]);

    const handleSort = useCallback((e) => {
        const sortOrder = e.target.value;
        console.log(sortOrder)

        const sorted = [...resumes].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredResumes(sorted);
        setCurrentPage(1);
       
    }, [resumes]);

    const showPreview = useCallback((resumeId) => {
        setIsPreviewShow(true)
        setPreviewResumeId(resumeId)

    }, [setIsPreviewShow,setPreviewResumeId])

    const closePreviewModal = useCallback(() => {
        setIsPreviewShow(false)

    }, [setIsPreviewShow])


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
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);

        const source = searchQuery || filteredResumes.length > 0 ? filteredResumes : resumes;

        const firstIndex = itemsPerPage * (page - 1);
        const lastIndex = firstIndex + itemsPerPage;

        const pageResumes = source.slice(firstIndex, lastIndex);
        setCurrentPageResume(pageResumes);
       
    }, [setCurrentPageResume,setCurrentPage]);


    //loading on page change
    useEffect(() => {
        handlePageChange(currentPage);
    }, [currentPage, resumes, filteredResumes]);
    //it call the function handlePageChange  everytime when currentpage,resume or filteredResume chnages
    const values = {
        theme,
        currentPageresume,
        setCurrentPageResume,
        resumes,
        setResumes,
        setIsModalShow,
        selectedResumeId,
        setSelectedResumeId,
        searchQuery,
        setSearchQuery,
        filteredResumes,
        setFilteredResumes,
        pages,
        setPages,
        currentPage,
        setCurrentPage,
        isPreviewShow,
        setIsPreviewShow,
        previewResumeId,
        setPreviewResumeId,
        handleDelete,
        handleEdit,
        handleCreate,
        confirmDelete,
        closeModal,
        handleSearchQuery,
        handleSort,
        showPreview,
        closePreviewModal,
        handlePageChange,
        isModalShow
    };

    return (
        <DashboardContext.Provider value={values}>
            {children}
        </DashboardContext.Provider>
    )
}
export default DashboardProvider
export const useDashboard = () => useContext(DashboardContext)