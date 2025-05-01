
import { CTAButton, Hspace } from "../components/CustomComponents";
import { templateDescription } from "../static-data/template_description";
import { allLayoutDescription, mostUsedLayoutDescription } from "../static-data/layout_description";
import TemplatesdescriptionCard from "../components/TemplateHeaderCard";


// Sample resume data
import ModernLayout6 from "../components/layouts/modern/layout-6/layout";
import { all_layouts_image_map, most_used_layouts_map } from "../components/LayoutImages";
import { infoCardsData } from "../static-data/infocard-data";
import MostUsedLayouts from "../components/MostUsedLayouts";
import LayoutCardWithDetails from "../components/LayoutCardWithDetails";

import { PaginationProvider, usePagination } from "../provider/paginationProvider";
import { useEffect } from "react";
import LayoutGridWrapper from "../components/layouts/wrappers/LayoutGridWrapper";
import LayoutCardGrid from "../components/LayoutDescriptionGrid";
import StartBuildingResumeButtton from "../components/StartBuildingResumeButton";


const layoutComponents = [
  // { Component: SimpleLayout1, titleKey: "Timeline", descriptionIndex: 1 },
  // { Component: SimpleLayout2, titleKey: "Timeline", descriptionIndex: 1 },
  // { Component: SimpleLayout3, titleKey: "Timeline", descriptionIndex: 1 },
  // { Component: SimpleLayout4, titleKey: "Timeline", descriptionIndex: 1 },
  // { Component: SimpleLayout5, titleKey: "Timeline", descriptionIndex: 1 },
  { Component: ModernLayout6, titleKey: "Timeline", descriptionIndex: 1 },
];



const AllLayouts = () => {
  const itemsPerPage = 3
  const { currentPage, PaginationButtons, setItemsLength } = usePagination()
  useEffect(() => {
    const length = Object.keys(all_layouts_image_map).length
    //setting items length to calculate pages
    setItemsLength(length)
  }, [])
  return (
    <>
      <Hspace />
      <TemplatesdescriptionCard
        title={templateDescription.all.title}
        description={templateDescription.all.description}
      />
      <LayoutGridWrapper>
        {
          Object.entries(all_layouts_image_map)
            //slice the array based on current page
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map(([layoutName, imageSrc], index) => {
              return (
                <LayoutCardWithDetails key={index} layoutName={layoutName} imageSRC={imageSrc} layoutDescription={allLayoutDescription[layoutName]} />

              )
            })

        }

      </LayoutGridWrapper>
      {/* paginations buttons */}
      {PaginationButtons}

      {/* most used layouts */}
      <PaginationProvider>
        <MostUsedLayouts layout_image_map={most_used_layouts_map} layout_descriptions={mostUsedLayoutDescription} />
      </PaginationProvider>

      {/* info card section */}
      <LayoutCardGrid cardInfos={infoCardsData} />
      <StartBuildingResumeButtton onClick={() => console.log("clicked")} />

    </>
  );
};

export default AllLayouts;
