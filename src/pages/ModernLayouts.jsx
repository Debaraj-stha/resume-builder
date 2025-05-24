import React, { useEffect } from "react";
import { templateDescription } from "../static-data/template_description";
import TemplatesdescriptionCard from "../components/TemplateHeaderCard";
import {  Hspace } from "../components/CustomComponents";
import { modern_layouts_image_map, mostPopularModernLayouts } from "../components/LayoutImages";
import {  modernLayoutDescription } from "../static-data/layout_description";
import ContainerWrapper from "../components/layouts/wrappers/ContainerWrapper";
import Container from "../components/Container";
import { PaginationProvider, usePagination } from "../provider/paginationProvider";


import LayoutCardGrid from "../components/LayoutDescriptionGrid";
import MostUsedLayouts from "../components/MostUsedLayouts";
import { modernLayoutCardInfos } from "../static-data/modern_layout_card_info";
import StartBuildingResumeButtton from "../components/StartBuildingResumeButton";
import RenderLayoutImage from "../components/RenderLayoutImage";
import { layout_type_map } from "../constant";
import UploadResumeCardAndIcon from "../components/UploadResumeCardAndIcon";
import LayoutsModal from "../components/LayoutsModal";
const ModernLayouts = () => {
    const itemsPerPage = 3
    const { currentPage, PaginationButtons, setItemsLength } = usePagination()
    useEffect(() => {
        console.log("ca;llled pdppd")
        const length = Object.keys(modern_layouts_image_map).length
        //setting items length to calculate pages
        setItemsLength(length)
    }, [])
    return (

        <>
            <Container>
                <Hspace height="200px" />
                <ContainerWrapper>
                    <TemplatesdescriptionCard title={templateDescription.modern.title} description={templateDescription.modern.description}></TemplatesdescriptionCard>

                    {/* layout images */}
                    <RenderLayoutImage
                        layoutDescription={modern_layouts_image_map}
                        layouts={modernLayoutDescription}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        layout_type={layout_type_map.MODERN}
                    />
                    {/* paginations buttons */}
                    {PaginationButtons}
                    {/* info card sections */}
                    <LayoutCardGrid cardInfos={modernLayoutCardInfos} />
                    <PaginationProvider>
                        <MostUsedLayouts layout_descriptions={modernLayoutDescription} layout_image_map={mostPopularModernLayouts} />
                    </PaginationProvider>
                </ContainerWrapper>
                <UploadResumeCardAndIcon/>
                <StartBuildingResumeButtton />
   <LayoutsModal/>
            </Container>

        </>
    )
}
export default ModernLayouts