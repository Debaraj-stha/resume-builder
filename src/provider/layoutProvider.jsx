import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "styled-components";

export const LayoutContext = createContext(null);

const LayoutProvider = ({ children }) => {
  const theme = useTheme();
  const methods = useForm({
    defaultValues: {
      personalDetails: {
        name: "",
        email: "",
        phone: "",
        profession: "",
        address: "",
        profile: "",
        urls: [{ value: "" }],
      },
      educations: [{ university: "", degree: "", start_complete: "" }],
      summary: "",
      experiences: [
        {
          companyName: "",
          position: "",
          aboutCompany: "",
          startDate: "",
          endDate: "",
          location: "",
          achievements: [{ value: "" }]

        },
      ],

      achievements: [{ acheivement: "", field: "", date: "" }],
      skills: [{ field: "", items: [{ value: "" }] }],
      languages: [
        {
          language: "",
          proficiency: ""
        }
      ],
      trainings: [
        {
          title: "",
          organization: "",
          year: "",
          location: ""
        }
      ],
      awards: [
        {
          title: "",
          organization: "",
          year: ""
        },
      ],
      passions: [{ value: "" }],
      strengths: [
        {
          title: "",
          description: ""
        },
      ],
      openSourceWork: [
        {
          projectName: "",
          role: "",
          description: "",
          technologies: [{ value: "" }],
          link: "",
          date: ""
        },
      ],
      industryExpertise: [
        {
          tech: "",
          value: ""
        }
      ],
      certificates: [
        {
          certificate: "",
          subject: "",
          date: ""
        },
      ],
      my_time: [
        {
          activity: "",
          value: ""
        }
      ]
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [measured, setMeasured] = useState(false);
  const sectionRefs = useRef([]);
  const [liveDetails, setLiveDetails] = useState({});
  const { getValues } = methods
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
    pdf.save("resume.pdf");
  };



  const groupSectionsIntoPages = (sectionRefs, setMeasured, setPages) => {
    console.log("called")
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
        alert("inside if")
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
    console.log("group",grouped)
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
    complie_input
  };
  return (
    <LayoutContext.Provider value={values}>
      <FormProvider {...methods}>{children}</FormProvider>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
export const useLayout = () => useContext(LayoutContext);
