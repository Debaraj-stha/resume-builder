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
        profile: pd.profile || "",
        urls: pd.urls || [{ value: "" }]
      },
      educations: data?.educations || defaultFormFields.educations,
      summary: pd.summary || "",
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
      my_time: data?.my_time || defaultFormFields.my_time
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
    // Convert the DOM element to a high-resolution canvas using html2canvas
    const canvas = await html2canvas(element, { scale: 2 });

    // Convert the canvas to a base64 PNG image
    const imageData = canvas.toDataURL("image/png");

    // Initialize a jsPDF instance for an A4 portrait PDF (units in pixels)
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

    // Get dimensions of the PDF page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate the scaled height of the image to fit the PDF width
    const imgProps = pdf.getImageProperties(imageData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Initialize remaining height and drawing position
    let heightLeft = imgHeight;
    let position = 0;

    // Add the first portion of the image to the first page
    pdf.addImage(imageData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add remaining portions of the image to new pages
    while (heightLeft > 0) {
      position -= pageHeight;      // Move the image up by one page
      pdf.addPage();               // Add a new page
      pdf.addImage(imageData, "PNG", 0, position, pdfWidth, imgHeight); // Draw remaining image
      heightLeft -= pageHeight;    // Reduce the remaining height
    }

    // Save the PDF file with a timestamped filename
    const filename = `${filename_prefix}resume-${Date.now()}.pdf`
    const pdfBlob = pdf.output("blob")
    //create file from blob
    const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });
    return pdfFile
  });


  // Group sections into printable pages
  const groupSectionsIntoPages = useCallback((refs, setMeasured, setPages) => {
    const PAGE_HEIGHT = 970;
    let grouped = [], currentGroup = [], currentHeight = 0;

    refs.current.forEach((ref, idx) => {
      if (ref && ref.offsetHeight) {
        const sectionHeight = ref.offsetHeight;
        if (currentHeight + sectionHeight > PAGE_HEIGHT) {
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
