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
import { useNavigate } from "react-router-dom";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const [resumes, setResumes] = useState([]);
    const [isModalShow, setIsModalShow] = useState(false);
    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isPreviewShow, setIsPreviewShow] = useState(false);
    const [previewResumeId, setPreviewResumeId] = useState(null);
    const[isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);
    const { getFiles, deleteFile } = useSupabase();
    const { user, loading: authLoading } = useAuth();
    const { setItemsLength } = usePagination();
    const navigate = useNavigate();

    // Fetch resumes on load
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setResumes([]);
            setIsLoading(false);
            return;
        }
        const loadResumes = async () => {
            try {
                setError(null);
                const files = await getFiles();
                setResumes(files || []);
            } catch (loadError) {
                setError(loadError.message || "We could not load your saved CVs.");
            } finally {
                setIsLoading(false);
            }
        };
        loadResumes();
    }, [user, authLoading]);

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


    const handleDelete = useCallback(async () => {
        const selected = resumes.find((resume) => resume.id === selectedResumeId);
        if (selected) {
            const { error: deleteError } = await deleteFile(selected.name);
            if (deleteError) {
                setError(deleteError.message || "CV could not be deleted.");
                return;
            }
            setResumes((prev) => prev.filter((resume) => resume.id !== selectedResumeId));
        }
        setIsModalShow(false);
        setSelectedResumeId(null);
    }, [deleteFile, resumes, selectedResumeId]);

    const confirmDelete = useCallback((id) => {
        setSelectedResumeId(id);
        setIsModalShow(true);
    }, []);

    const closeModal = useCallback(() => setIsModalShow(false), []);

    const handleEdit = useCallback(() => navigate("/templates"), [navigate]);

    const handleCreate = useCallback(() => navigate("/ats-checker"), [navigate]);

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
        const selected = resumes.find((resume) => resume.id === id);
        if (selected?.url) window.open(selected.url, "_blank", "noopener,noreferrer");
    }, [resumes]);

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
            isLoading,
            error
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
            isLoading,
            error
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
