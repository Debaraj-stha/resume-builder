
import { Hspace } from "../components/CustomComponents";
import { templateDescription } from "../static-data/template_description";
import { allLayoutDescription, mostUsedLayoutDescription } from "../static-data/layout_description";
import TemplatesdescriptionCard from "../components/TemplateHeaderCard";
import { all_layouts_image_map, most_used_layouts_map } from "../components/LayoutImages";
import { infoCardsData } from "../static-data/infocard-data";
import MostUsedLayouts from "../components/MostUsedLayouts";
import { PaginationProvider, usePagination } from "../provider/paginationProvider";
import { useEffect } from "react";
import LayoutCardGrid from "../components/LayoutDescriptionGrid";
import RenderLayoutImage from "../components/RenderLayoutImage";
import UploadResumeCardAndIcon from "../components/UploadResumeCardAndIcon";







const AllLayouts = () => {
  const itemsPerPage = 3
  const { currentPage, PaginationButtons, setItemsLength } = usePagination()
  useEffect(() => {
    const length = Object.keys(all_layouts_image_map).length
    //setting items length to calculate pages
    setItemsLength(length)
  }, [])
  return (
    <PaginationProvider>
      <Hspace />
      <TemplatesdescriptionCard
        title={templateDescription.all.title}
        description={templateDescription.all.description}
      />

      {/* layout images */}
      <RenderLayoutImage
        layouts={all_layouts_image_map}
        layoutDescription={allLayoutDescription}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage} />
      {/* paginations buttons */}
      {PaginationButtons}

      {/* most used layouts */}
      <PaginationProvider>
        <MostUsedLayouts layout_image_map={most_used_layouts_map} layout_descriptions={mostUsedLayoutDescription} />
      </PaginationProvider>

      {/* info card section */}
      <LayoutCardGrid cardInfos={infoCardsData} />
      {/* upload old resume card */}
      <UploadResumeCardAndIcon />
    </PaginationProvider>
  );
};

export default AllLayouts;
