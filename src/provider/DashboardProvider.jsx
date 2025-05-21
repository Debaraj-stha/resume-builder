import {
    useState,
    useEffect,
    createContext,
    useContext,
    useCallback,
    useMemo,
} from "react";
import { useSupabase } from "./supabaseProvider";
import { usePagination } from "./paginationProvider";
import { useAuth } from "./AuthProvider";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const [resumes, setResumes] = useState([]);
    const [isModalShow, setIsModalShow] = useState(false);
    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isPreviewShow, setIsPreviewShow] = useState(false);
    const [previewResumeId, setPreviewResumeId] = useState(null);
    const[isLoading, setIsLoading] = useState(true);

    const { getFiles } = useSupabase();
    const { user } = useAuth();
    const { setItemsLength } = usePagination();

    // Fetch resumes on load
    useEffect(() => {
        if (!user) return;
        const loadResumes = async () => {
            const files = await getFiles();
            setResumes(files || []);
            console.log("resume files", files);
            setIsLoading(false);
        };
        loadResumes();
    }, [user, getFiles]);

    // Update item count for pagination
    useEffect(() => {
        setItemsLength(filteredResumes.length);
    }, [resumes, searchQuery]);

    // Filtered list based on search query
    const filteredResumes = useMemo(() => {
        if (!searchQuery) return resumes;
        return resumes.filter((resume) =>
            resume.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [resumes, searchQuery]);


    const handleDelete = useCallback(() => {
        setResumes((prev) =>
            prev.filter((resume) => resume.id !== selectedResumeId)
        );
        setIsModalShow(false);
        setSelectedResumeId(null);
    }, [selectedResumeId]);

    const confirmDelete = useCallback((id) => {
        setSelectedResumeId(id);
        setIsModalShow(true);
    }, []);

    const closeModal = useCallback(() => setIsModalShow(false), []);

    const handleEdit = useCallback((id) => {
        alert(`Edit resume with ID: ${id}`);
    }, []);

    const handleCreate = useCallback(() => {
        const newResume = {
            id: Date.now(),
            created_at: new Date(),
            name: `New Resume ${resumes.length + 1}`,
            url: "",
        };
        setResumes((prev) => [newResume, ...prev]);
    }, [resumes]);

    const handleSearchQuery = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSort = useCallback(
        (e) => {
            const sortOrder = e.target.value;
            const sorted = [...resumes].sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
            setResumes(sorted);
        },
        [resumes]
    );

    const showPreview = useCallback((id) => {
        setPreviewResumeId(id);
        setIsPreviewShow(true);
    }, []);

    const closePreviewModal = useCallback(() => {
        setIsPreviewShow(false);
        setPreviewResumeId(null);
    }, []);

    // Memoized context value
    const contextValue = useMemo(
        () => ({
            resumes,
            setResumes,
            isModalShow,
            setIsModalShow,
            selectedResumeId,
            setSelectedResumeId,
            searchQuery,
            setSearchQuery,
            filteredResumes,
            isPreviewShow,
            previewResumeId,
            handleDelete,
            handleEdit,
            handleCreate,
            confirmDelete,
            closeModal,
            handleSearchQuery,
            handleSort,
            showPreview,
            closePreviewModal,
            isLoading
        }),
        [
            resumes,
            setResumes,
            isModalShow,
            setIsModalShow,
            selectedResumeId,
            setSelectedResumeId,
            searchQuery,
            setSearchQuery,
            filteredResumes,
            isPreviewShow,
            previewResumeId,
            handleDelete,
            handleEdit,
            handleCreate,
            confirmDelete,
            closeModal,
            handleSearchQuery,
            handleSort,
            showPreview,
            closePreviewModal,
            isLoading
        ]
    );

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;
export const useDashboard = () => useContext(DashboardContext);
