  // useEffect(() => {
  //   // If the component has already been measured, return early to avoid unnecessary re-execution.
  //   if (measured) return;
  //   console.log("measuiring")

  //   // This function groups sections into pages based on their height.
  //   const groupSectionsIntoPages = () => {
  //     // Initialize an array to hold the grouped sections (pages).
  //     let grouped = [];
  //     // Initialize a temporary array to collect sections for the current page.
  //     let currentGroup = [];
  //     // Track the total height of the sections on the current page.
  //     let currentHeight = 0;
  //     // Iterate over the references to each section (stored in `sectionRefs`).
  //     sectionRefs.current.forEach((ref, idx) => {
        
  //       // If the section reference is valid and has a height, process it.
  //       if (ref && ref.offsetHeight) {
  //         const sectionHeight = ref.offsetHeight; // Get the height of the current section.

  //         // If adding this section would exceed the page height, push the current group to `grouped` and start a new page.
  //         if (currentHeight + sectionHeight > PAGE_HEIGHT) {
  //           grouped.push(currentGroup); // Add the current group of sections as a new page.
  //           currentGroup = []; // Reset the current group for the new page.
  //           currentHeight = 0; // Reset the total height for the new page.
  //         }

  //         // Add the section index to the current group.
  //         currentGroup.push(idx);
  //         // Add the height of the section to the current page's total height.
  //         currentHeight += sectionHeight;
  //       }
  //     });

  //     // After the loop, if there are any remaining sections in the current group, push them as a new page.
  //     if (currentGroup.length > 0) {
  //       grouped.push(currentGroup);
  //     }

  //     // Set the grouped sections (pages) in the state.
  //     setPages(grouped);
  //     // Mark the measurement process as complete.
  //     setMeasured(true);
  //   };

  //   // Use `setTimeout` to delay the execution of the `groupSectionsIntoPages` function,
  //   // allowing the DOM to render first. This ensures that section heights are properly calculated.
  //   setTimeout(()=>{
  //     groupSectionsIntoPages()
      
  //   }, 1500); // Delay allows DOM to render.
  // }, [measured]); // Dependency array: re-run effect if `measured` changes (only happens once after initial measurement).

