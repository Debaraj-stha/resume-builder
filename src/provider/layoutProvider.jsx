import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { useSupabase } from "./supabaseProvider";
import { useAuth } from "./AuthProvider";
import {
  defaultAchievements,
  defaultAwards,
  defaultCertificates,
  defaultEducation,
  defaultExperiences,
  defaultIndustryExpertise,
  defaultLanguages,
  defaultmy_time,
  defaultOpenSourceWork,
  defaultpassions,
  defaultPersonalDetails,
  defaultSkills,
  defaultstrengths,
  defaultTrainings,
} from "../components/helper/default_form_value";

export const LayoutContext = createContext(null);

const LayoutProvider = ({ children }) => {
  const theme = useTheme();
  const methods = useForm({
    defaultValues: {
      personalDetails: defaultPersonalDetails,
      educations: defaultEducation,
      summary: "",
      experiences: defaultExperiences,
      achievements: defaultAchievements,
      skills: defaultSkills,
      languages: defaultLanguages,
      trainings: defaultTrainings,
      awards: defaultAwards,
      passions: defaultpassions,
      strengths: defaultstrengths,
      openSourceWork: defaultOpenSourceWork,
      industryExpertise: defaultIndustryExpertise,
      certificates: defaultCertificates,
      my_time: defaultmy_time,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [measured, setMeasured] = useState(false);
  const sectionRefs = useRef([]);
  const [liveDetails, setLiveDetails] = useState({});
  const [savedData, setSavedData] = useState({})

  const { getSavedData } = useSupabase()
  const { user } = useAuth()
  const { getValues, reset } = methods


  const complie_input = () => {
    const values = getValues()
    setLiveDetails(values)
  }

  // Initial state setup
  useEffect(() => {
    setLiveDetails(getValues());
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //retriving saved data from database
  useEffect(() => {
    const loadSavedData = async () => {
      const data = await getSavedData()
      console.log("saved data", data)
      setSavedData(data)
    }
    if (user) {
      loadSavedData()
    }
  }, [user])


  //resetting form
  useEffect(() => {
    const savedPersonalDetail = savedData?.personalDetails || {};
    const savedSummary = savedPersonalDetail?.summary || "";
    const safePersonalDetails = {
      name: savedPersonalDetail?.name || "",
      email: savedPersonalDetail?.email || "",
      phone: savedPersonalDetail?.phone || "",
      profession: savedPersonalDetail?.profession || "",
      address: savedPersonalDetail?.address || "",
      profile: savedPersonalDetail?.profile || "",
      urls: savedData?.urls?.map((url) => ({ value: url.url })) || [{ value: "" }],
    };

    const safeEducations = savedData?.educations || [{
      university: "",
      degree: "",
      start_year: "",
      end_year: "",
      address: "",
      gpa: ""
    }];

    const safeExperiences = savedData?.experiences || [{
      company_name: "",
      position: "",
      about_company: "",
      start_date: "",
      end_date: "",
      location: "",
      achievements: [{ value: "" }]
    }];

    const safeAchievements = savedData?.achievements || [{
      achievement: "",
      field: "",
      date: ""
    }];

    const safeSkills = savedData?.skills || [{
      field: "",
      items: [{ value: "" }]
    }];

    const safeLanguages = savedData?.languages || [{
      language: "",
      proficiency: ""
    }];

    const safeTrainings = savedData?.trainings || [{
      title: "",
      organization: "",
      year: "",
      location: ""
    }];

    const safeAwards = savedData?.awards || [{
      title: "",
      organization: "",
      year: ""
    }];

    const safePassions = savedData?.passions || [{ value: "" }];

    const safeStrengths = savedData?.strengths || [{
      title: "",
      description: ""
    }];

    const safeOpenSourceWork = savedData?.openSourceWork || [{
      projectName: "",
      role: "",
      description: "",
      technologies: [{ value: "" }],
      link: "",
      date: ""
    }];

    const safeIndustryExpertise = savedData?.industryExpertise || [{
      tech: "",
      value: ""
    }];

    const safeCertificates = savedData?.certificates || [{
      certificate: "",
      subject: "",
      date: ""
    }];

    const safeMyTime = savedData?.my_time || [{
      activity: "",
      value: ""
    }];

    // Reset form with safe values
    reset({
      personalDetails: safePersonalDetails,
      educations: safeEducations,
      summary: savedSummary,
      experiences: safeExperiences,
      achievements: safeAchievements,
      skills: safeSkills,
      languages: safeLanguages,
      trainings: safeTrainings,
      awards: safeAwards,
      passions: safePassions,
      strengths: safeStrengths,
      openSourceWork: safeOpenSourceWork,
      industryExpertise: safeIndustryExpertise,
      certificates: safeCertificates,
      my_time: safeMyTime
    });

    // Set live details 
    setLiveDetails({
      personalDetails: safePersonalDetails,
      educations: safeEducations,
      summary: savedSummary,
      experiences: safeExperiences,
      achievements: safeAchievements,
      skills: safeSkills,
      languages: safeLanguages,
      trainings: safeTrainings,
      awards: safeAwards,
      passions: safePassions,
      strengths: safeStrengths,
      openSourceWork: safeOpenSourceWork,
      industryExpertise: safeIndustryExpertise,
      certificates: safeCertificates,
      my_time: safeMyTime
    });

  }, [savedData]);


  const ref = useRef(null);


  const generatePDF = async () => {
    // Get the DOM element that we want to convert to PDF
    const element = ref.current;

    // Use html2canvas to render the DOM element into a high-resolution canvas (scale: 2 for better quality)
    const canvas = await html2canvas(element, { scale: 2 });

    // Convert the canvas to a PNG image in base64 format
    const imageData = canvas.toDataURL("image/png");

    // Create a new jsPDF instance for A4 portrait page with pixel units
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4"
    });

    // Get the dimensions of the A4 PDF page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Get the original image dimensions and calculate the scaled height to match the PDF width
    const imgProps = pdf.getImageProperties(imageData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Initialize remaining height and starting position
    let heightLeft = imgHeight;
    let position = 0;

    // Add the first part of the image to the PDF (starting from the top)
    pdf.addImage(imageData, "PNG", 0, position, pdfWidth, imgHeight);

    // Subtract one page height since first page is already added
    heightLeft -= pageHeight;

    // While there is still more content to add...
    while (heightLeft > 0) {
      // Shift the image up by one page height
      position = position - pageHeight;

      // Add a new page to the PDF
      pdf.addPage();

      // Draw the same image again, shifted upward to show the next portion
      pdf.addImage(imageData, "PNG", 0, position, pdfWidth, imgHeight);

      // Subtract another page height from the remaining image
      heightLeft -= pageHeight;
    }

    // Save the final multi-page PDF file with the name "resume.pdf"
    const today = Date.now()
    pdf.save(`resume-${today}.pdf`);
  };
  const groupSectionsIntoPages = (sectionRefs, setMeasured, setPages) => {

    const PAGE_HEIGHT = 970;

    // Initialize an array to hold the grouped sections (pages).
    let grouped = [];
    // Initialize a temporary array to collect sections for the current page.
    let currentGroup = [];
    // Track the total height of the sections on the current page.
    let currentHeight = 0;
    // Iterate over the references to each section (stored in `sectionRefs`).
    sectionRefs.current.forEach((ref, idx) => {
      // If the section reference is valid and has a height, process it.
      if (ref && ref.offsetHeight) {

        const sectionHeight = ref.offsetHeight; // Get the height of the current section.

        // If adding this section would exceed the page height, push the current group to `grouped` and start a new page.
        if (currentHeight + sectionHeight > PAGE_HEIGHT) {
          grouped.push(currentGroup); // Add the current group of sections as a new page.
          currentGroup = []; // Reset the current group for the new page.
          currentHeight = 0; // Reset the total height for the new page.
        }

        // Add the section index to the current group.
        currentGroup.push(idx);
        // Add the height of the section to the current page's total height.
        currentHeight += sectionHeight;
      }

    });

    // After the loop, if there are any remaining sections in the current group, push them as a new page.
    if (currentGroup.length > 0) {
      grouped.push(currentGroup);
    }
    // Set the grouped sections (pages) in the state.
    setPages(grouped);
    // Mark the measurement process as complete.
    setMeasured(true);
  };

  const values = {
    theme,
    isLoading,
    generatePDF,
    ref,
    measured,
    setMeasured,
    groupSectionsIntoPages,
    sectionRefs,
    liveDetails,
    setLiveDetails,
    complie_input,
  };
  return (
    <LayoutContext.Provider value={values}>
      <FormProvider {...methods}>{children}</FormProvider>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
export const useLayout = () => useContext(LayoutContext);
