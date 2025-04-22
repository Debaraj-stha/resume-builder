// Import React hooks for state management and side effects
import { useState, useEffect } from "react";

// Custom hook to dynamically import and render layout sections based on layoutId
const useDynamicLayoutSections = (layoutId, resumeData, layout_type = "classical") => {
  // Initialize state to hold the output sections from the layout file
  //function to load modern layout sections
  const [sections, setSections] = useState([]);
  const loadModernLayout = async (isMounted) => { }
  // Function to load classical layout sections
  const loadClassicLayout = async (isMounted) => {
    let layoutModule;
    // Switch between different layout files based on layoutId
    switch (layoutId) {
      case 1:
        layoutModule = await import("./classic/resume-output/layout1-output"); // Lazy load layout 1
        break;
      case 2:
        layoutModule = await import("./classic/resume-output/layout2-output"); // Lazy load layout 2
        break;
      case 3:
        layoutModule = await import("./classic/resume-output/layout3-output"); // Lazy load layout 3
        break;
      default:
        layoutModule = null; // Handle unknown layoutId
    }

    // If module is loaded and component is still mounted, update the sections state
    if (layoutModule && isMounted) {
      const output = layoutModule.default(resumeData); // Call the default exported function with resume data
      setSections(output); // Set the resulting sections
    }

  }


  // useEffect runs whenever layoutId or resumeData changes
  useEffect(() => {
    // Flag to prevent setting state if component is unmounted before async function finishes
    let isMounted = true;

    // Async function to dynamically load the appropriate layout module
    const load = async () => {
      if (layout_type === "modern") {
        await loadModernLayout(isMounted);
      } else {
        await loadClassicLayout(isMounted);
      }
    };

    // Call the async loader function
    load();

    // Cleanup function to set isMounted to false if component unmounts
    return () => {
      isMounted = false;
    };
  }, [layoutId, resumeData]); // Re-run effect if layoutId or resumeData changes

  // Return the loaded sections to be used in the UI
  return sections;
};

export default useDynamicLayoutSections;
