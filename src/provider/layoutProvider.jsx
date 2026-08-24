import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import defaultFormFields from "../helper/default_form_value";
import usePDFTextExtracter from "../helper/hooks/usePDFTextExtracter";



export const LayoutContext = createContext(null);

const LayoutProvider = ({ children }) => {
  const methods = useForm({ defaultValues: defaultFormFields });
  const { getValues, reset } = methods;
 


  const [isLoading, setIsLoading] = useState(true);
  const [measured, setMeasured] = useState(false);
  const [liveDetails, setLiveDetails] = useState({});
  const [savedData, setSavedData] = useState({});
  const [isSavedLoaded, setIsSavedLoaded] = useState(false);
  const [isExtractingResumeInfo, setIsExtractingResumeInfo] = useState(false)
  const [isLayoutChooseModalOpen, setIsLayoutModalOpen] = useState()
  const[isDetailsUpdating,setDetailsUpdating]=useState(false)
  const fileInputRef = useRef(null)
  const sectionRefs = useRef([]);
  const pdfRef = useRef(null);
  const extractText = usePDFTextExtracter()

  const closeLayoutChooseModal = useCallback(() => {
    setIsLayoutModalOpen((prev) => !prev)
  }, [isLayoutChooseModalOpen])



  // Helper: Extract safe form data
  const buildSafeFormFields = (data) => {
    const pd = data?.personalDetails || {};
    return {
      personalDetails: {
        name: pd.name || "",
        email: pd.email || "",
        phone: pd.phone || "",
        profession: pd.profession || "",
        address: pd.address || "",
        profile: typeof pd.profile === "string" || Array.isArray(pd.profile) ? pd.profile : [],
        urls: pd.urls || [{ value: "" }]
      },
      educations: data?.educations || defaultFormFields.educations,
      summary: data?.summary || pd.summary || "",
      experiences: data?.experiences || defaultFormFields.experiences,
      achievements: data?.achievements || defaultFormFields.achievements,
      skills: data?.skills || defaultFormFields.skills,
      languages: data?.languages || defaultFormFields.languages,
      trainings: data?.trainings || defaultFormFields.trainings,
      awards: data?.awards || defaultFormFields.awards,
      passions: data?.passions || defaultFormFields.passions,
      strengths: data?.strengths || defaultFormFields.strengths,
      openSourceWork: data?.openSourceWork || defaultFormFields.openSourceWork,
      industryExpertise: data?.industryExpertise || defaultFormFields.industryExpertise,
      certificates: data?.certificates || defaultFormFields.certificates,
      my_time: data?.my_time || defaultFormFields.my_time,
      additionalSections: data?.additionalSections || []
    };
  };

  // Helper: Compile form data to liveDetails
  const compileInput = useCallback(() => {
    setLiveDetails(getValues());
  });

  // PDF generation
  // Function to generate a multi-page PDF from a DOM element
  const generatePDF = useCallback(async (filename_prefix = "new_") => {
    const element = pdfRef.current;
    if (!element) throw new Error("The CV preview is not ready yet.");

    const previewCanvas = element.closest(".preview-canvas");
    const previousZoom = previewCanvas?.style.zoom || "";
    const previousFilter = previewCanvas?.style.filter || "";

    try {
      // Capture the document at its real A4 size. The editor uses CSS zoom,
      // which otherwise causes html2canvas to collapse and overlap glyphs.
      if (previewCanvas) {
        previewCanvas.style.zoom = "1";
        previewCanvas.style.filter = "none";
      }
      if (document.fonts?.ready) await document.fonts.ready;
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const pages = [...element.querySelectorAll('[data-resume-page="true"]')];
      if (!pages.length) throw new Error("No printable CV pages were found.");

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      for (let index = 0; index < pages.length; index += 1) {
        const page = pages[index];
        const canvas = await html2canvas(page, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false,
          width: page.offsetWidth,
          height: page.offsetHeight,
          windowWidth: page.offsetWidth,
          windowHeight: page.offsetHeight,
          scrollX: 0,
          scrollY: 0,
        });
        if (!canvas.width || !canvas.height) throw new Error(`CV page ${index + 1} could not be rendered.`);
        if (index > 0) pdf.addPage("a4", "portrait");
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }

      const filename = `${filename_prefix}resume-${Date.now()}.pdf`;
      return new File([pdf.output("blob")], filename, { type: "application/pdf" });
    } finally {
      if (previewCanvas) {
        previewCanvas.style.zoom = previousZoom;
        previewCanvas.style.filter = previousFilter;
      }
    }
  });


  // Group sections into printable pages
  const groupSectionsIntoPages = useCallback((refs, setMeasured, setPages) => {
    // A4 is 1122.5 CSS px at 96dpi. ResumeWrapper uses 20mm (about 76px)
    // padding at the top and bottom, leaving roughly 971px of usable content.
    const PAGE_HEIGHT = 970;
    let grouped = [], currentGroup = [], currentHeight = 0;

    refs.current.forEach((ref, idx) => {
      if (ref && ref.offsetHeight) {
        const sectionHeight = ref.offsetHeight;
        if (currentGroup.length > 0 && currentHeight + sectionHeight > PAGE_HEIGHT) {
          grouped.push(currentGroup);
          currentGroup = [];
          currentHeight = 0;
        }
        currentGroup.push(idx);
        currentHeight += sectionHeight;
      }
    });

    if (currentGroup.length > 0) grouped.push(currentGroup);
    setPages(grouped);
    setMeasured(true);
  });
  //click event on current fileref
  const handleFilePick = () => {
    fileInputRef.current?.click();
  };
  //handling file change
  const handleFileChange = useCallback(async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setIsExtractingResumeInfo(true)
        setDetailsUpdating(true)
        const extractedDetails = await extractText(file)
        console.log("extractedDetails", extractedDetails)
        const ele=fileInputRef.current
        const layout_type=ele.getAttribute("data-layout-type")
        const layout_id=ele.getAttribute("data-layout-id")
        if(!(layout_type && layout_id)){
          setIsLayoutModalOpen(true)
        }
        setLiveDetails(extractedDetails)
        setDetailsUpdating(false)
      }
    } catch (error) {
      console.error("Error while uploading file", error)
    }
  });





  // Reset form when saved data is ready
  useEffect(() => {
    if (!savedData || Object.keys(savedData).length === 0) return;

    const safeFields = buildSafeFormFields(savedData);
    reset(safeFields);
    setLiveDetails(safeFields);
  }, [savedData]);

  // Initial load
  useEffect(() => {
    setLiveDetails(getValues());

  }, []);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const contextValue = useMemo(() => ({
    isLoading,
    generatePDF,
    ref: pdfRef,
    measured,
    setMeasured,
    groupSectionsIntoPages,
    sectionRefs,
    liveDetails,
    setLiveDetails,
    compileInput,
    isSavedLoaded,
    setIsSavedLoaded,
    setSavedData,
    fileInputRef,
    handleFilePick,
    handleFileChange,
    isExtractingResumeInfo,
    setIsExtractingResumeInfo,
    closeLayoutChooseModal,
    isLayoutChooseModalOpen,
    setDetailsUpdating,
    isDetailsUpdating
  }
  ), [
    isLoading,
    generatePDF,
    pdfRef,
    measured,
    setMeasured,
    groupSectionsIntoPages,
    sectionRefs,
    liveDetails,
    setLiveDetails,
    compileInput,
    isSavedLoaded,
    setIsSavedLoaded,
    setSavedData,
    fileInputRef,
    handleFileChange,
    handleFilePick,
    isExtractingResumeInfo,
    setIsExtractingResumeInfo,
    closeLayoutChooseModal,
    isLayoutChooseModalOpen,
    isDetailsUpdating,
    setDetailsUpdating
  ]);

  return (
    <LayoutContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
export const useLayout = () => useContext(LayoutContext);
