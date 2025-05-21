import { memo } from "react";
import LayoutCardWithDetails from "./LayoutCardWithDetails";
import LayoutGridWrapper from "./layouts/wrappers/LayoutGridWrapper";

const RenderLayoutImage = memo(({ layouts, layoutDescription, currentPage, itemsPerPage, layout_type = "all" }) => {
  //  Flatten
  const layoutEntries = layout_type === "all"
    ? Object.entries(layouts) // e.g., [['modern', {...}], ['classical', {...}]]
    : [[layout_type, layouts[layout_type]]]; // e.g., [['modern', {...}]]

  const allLayouts = layoutEntries.flatMap(([type, layoutMap]) =>
    Object.entries(layoutMap).map(([layoutName, imageSrc]) => ({
      layoutType: type,
      layoutName,
      imageSrc,
    }))
  );

  // Paginate
  const paginatedLayouts = allLayouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <LayoutGridWrapper>
      {paginatedLayouts.map((layout, index) => (
        <LayoutCardWithDetails
          key={`${layout.layoutType}-${layout.layoutName}`}
          layoutName={layout.layoutName}
          imageSRC={layout.imageSrc}
          layout_id={index + 1 + (currentPage - 1) * itemsPerPage}
          layout_type={layout.layoutType}
          layoutDescription={layoutDescription[layout.layoutName] || ""}
        />
      ))}
    </LayoutGridWrapper>
  );
});

export default RenderLayoutImage;
