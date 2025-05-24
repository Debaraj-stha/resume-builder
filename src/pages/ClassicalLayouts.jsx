import React, { useEffect } from "react";
import { templateDescription } from "../static-data/template_description";
import TemplatesdescriptionCard from "../components/TemplateHeaderCard";
import { Hspace } from "../components/CustomComponents";
import { classical_layouts_image_map, mostPopularClassicalLayouts } from "../components/LayoutImages";
import { classicalLayoutDescription } from "../static-data/layout_description";
import ContainerWrapper from "../components/layouts/wrappers/ContainerWrapper";
import Container from "../components/Container";
import { PaginationProvider, usePagination } from "../provider/paginationProvider";
import { classicalLayoutCardInfos } from "../static-data/classicalLayoutDescription"

import LayoutCardGrid from "../components/LayoutDescriptionGrid";
import MostUsedLayouts from "../components/MostUsedLayouts";
import StartBuildingResumeButtton from "../components/StartBuildingResumeButton";
import RenderLayoutImage from "../components/RenderLayoutImage";
import { layout_type_map } from "../constant";
import UploadResumeCardAndIcon from "../components/UploadResumeCardAndIcon";
import LayoutsModal from "../components/LayoutsModal";
const ClassicalLayouts = () => {
    const itemsPerPage = 3
    const { currentPage, PaginationButtons, setItemsLength } = usePagination()
    useEffect(() => {
        const length = Object.keys(classical_layouts_image_map).length
        //setting items length to calculate pages
        setItemsLength(length)
    }, [])
    const handleButtonClick = () => {

    }
  
    return (

        <>
            <Container>
                <Hspace height="200px" />
                <ContainerWrapper>
                    <TemplatesdescriptionCard title={templateDescription.classical.title} description={templateDescription.classical.description}></TemplatesdescriptionCard>

                    {/* layout images */}
                    <RenderLayoutImage
                        layoutDescription={classicalLayoutDescription}
                        layouts={classical_layouts_image_map}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        layout_type={layout_type_map.CLASSICAL}
                    />
                    {PaginationButtons}
                    {/* info card sections */}
                    <LayoutCardGrid cardInfos={classicalLayoutCardInfos} />
                    <PaginationProvider>
                        <MostUsedLayouts layout_descriptions={classicalLayoutDescription} layout_image_map={mostPopularClassicalLayouts} />
                    </PaginationProvider>

                </ContainerWrapper>
                <UploadResumeCardAndIcon />
                <StartBuildingResumeButtton onClick={handleButtonClick} />
                   <LayoutsModal/>
            </Container> 
        </>
    )
}
export default ClassicalLayouts