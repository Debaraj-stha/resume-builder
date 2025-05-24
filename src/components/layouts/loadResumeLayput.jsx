// Import React hooks for state management and side effects
import { useState, useEffect } from "react";
import { layout_type_map } from "../../constant";
import { TransparentLine } from "../Divider/TransparentDividers";
const defaultDivider=<TransparentLine/>
// Custom hook to dynamically import and render layout sections based on layoutId
const useDynamicLayoutSections = (layoutId, resumeData, layout_type = "classical",divider=defaultDivider) => {

  // Initialize state to hold the output sections from the layout file
  //function to load modern layout sections
  const [sections, setSections] = useState([]);
  const loadModernLayout = async (isMounted) => {

    let layoutModule;
    switch (layoutId) {
      case 1:
        layoutModule = await import("./modern/layout-output/layout-1-output")
        break
      case 2:
        layoutModule = await import("./modern/layout-output/layout2-output")
        break
      case 3:
        layoutModule = await import("./modern/layout-output/layout-3-output")
        break
      case 4:
        layoutModule = await import("./modern/layout-output/layout4-output")
        break
      case 5:
        layoutModule = await import("./modern/layout-output/layout5-output")
        break
      case 6:
        layoutModule = await import("./modern/layout-output/layout6-output")
        break
    }
    if (layoutModule && isMounted) {
      const output = layoutModule.default(resumeData, divider)
      setSections(output)
    }

  }
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
      case 4:
        layoutModule = await import("./classic/resume-output/layout4-output"); // Lazy load layout 4
        break
      case 5:
        layoutModule = await import("./classic/resume-output/layout5-output")
        break;
      default:
        layoutModule = await import("./classic/resume-output/layout6-output")
    }

    // If module is loaded and component is still mounted, update the sections state
    if (layoutModule && isMounted) {
      const output = layoutModule.default(resumeData, divider); // Call the default exported function with resume data
      setSections(output); // Set the resulting sections
    }

  }

  const loadSimpleLayout = async (isMounted) => {
    let layoutModule
    switch (layoutId) {
      case 1:
        layoutModule = await import("../layouts/simple/layout-output/layout-1-output")
        break
      case 2:
        layoutModule = await import("../layouts/simple/layout-output/layout-2-output")
        break
      case 3:
        layoutModule = await import("../layouts/simple/layout-output/layout-3-output")
        break
      case 4:
        layoutModule = await import("../layouts/simple/layout-output/layout-4-output")
        break
      case 5:
        layoutModule = await import("../layouts/simple/layout-output/layout-5-output")
        break
      default:
        layoutModule = null

    }
    if (layoutModule && isMounted) {
      const output = layoutModule.default(resumeData, divider)
      setSections(output)
    }
  }

  const loadCreativeLayout = async (isMounted) => {
    let layoutModule
    switch (layoutId) {
      case 1:
        layoutModule = await import("./creative/layout-output/layout-1-output")
        break
      case 2:
        layoutModule = await import("./creative/layout-output/layout-2.output")
        break
      case 3:
        layoutModule = await import("./creative/layout-output/layout-3-output")
        break
      case 4:
        layoutModule = await import("./creative/layout-output/layout-4-output")
        break
      case 5:
        layoutModule = await import("./creative/layout-output/layout-5-output")
        break
    }
    if (layoutModule && isMounted) {
      const output = layoutModule.default(resumeData, divider)
      setSections(output)
    }
  }
  // useEffect runs whenever layoutId or resumeData changes
  useEffect(() => {
    // Flag to prevent setting state if component is unmounted before async function finishes
    let isMounted = true;

    // Async function to dynamically load the appropriate layout module
    const load = async () => {
      if (layout_type === layout_type_map.MODERN) {
        await loadModernLayout(isMounted);
      }
      else if (layout_type === layout_type_map.SIMPLE) {
        await loadSimpleLayout(isMounted)
      }
      else if (layout_type === layout_type_map.CREATIVE) {
        await loadCreativeLayout(isMounted)
      }
      else {
        await loadClassicLayout(isMounted);
      }
    };

    // Call the async loader function
    load();

    // Cleanup function to set isMounted to false if component unmounts
    return () => {
      isMounted = false;
    };
  }, [layoutId, resumeData,divider]); // Re-run effect if layoutId or resumeData changes

  // Return the loaded sections to be used in the UI
  return sections;
};

export default useDynamicLayoutSections;
