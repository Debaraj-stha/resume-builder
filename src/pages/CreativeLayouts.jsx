import React, { useEffect } from "react";
import { templateDescription } from "../static-data/template_description";
import TemplatesdescriptionCard from "../components/TemplateHeaderCard";
import {  Hspace } from "../components/CustomComponents";
import { creative_layouts_image_map, mostPopularCreativeLayouts } from "../components/LayoutImages";
import {  creativeLayoutDescription } from "../static-data/layout_description";
import ContainerWrapper from "../components/layouts/wrappers/ContainerWrapper";
import Container from "../components/Container";
import { PaginationProvider, usePagination } from "../provider/paginationProvider";
import LayoutCardGrid from "../components/LayoutDescriptionGrid";
import MostUsedLayouts from "../components/MostUsedLayouts";

import { creativeLayoutCardInfos } from "../static-data/creative_layout_card_info";
import StartBuildingResumeButtton from "../components/StartBuildingResumeButton";
import RenderLayoutImage from "../components/RenderLayoutImage";
import { layout_type_map } from "../constant";
import UploadResumeCardAndIcon from "../components/UploadResumeCardAndIcon";
import LayoutsModal from "../components/LayoutsModal";
const CreativeLayouts = () => {
    const itemsPerPage = 3
    const { currentPage, PaginationButtons, setItemsLength } = usePagination()
    useEffect(() => {
        const length = Object.keys(creative_layouts_image_map).length
        //setting items length to calculate pages
        setItemsLength(length)
    }, [])
    return (

        <>
            <Container>
                <Hspace height="200px" />
                <ContainerWrapper>
                    <TemplatesdescriptionCard title={templateDescription.creative.title}
                        description={templateDescription.creative.description}></TemplatesdescriptionCard>

                    {/* layout images */}
                    <RenderLayoutImage
                        layoutDescription={creativeLayoutDescription}
                        layouts={creative_layouts_image_map}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        layout_type={layout_type_map.CREATIVE}
                    />
                    {/* paginations buttons */}
                    {PaginationButtons}
                    {/* info card sections */}
                    <LayoutCardGrid cardInfos={creativeLayoutCardInfos} />
                    <PaginationProvider>
                        <MostUsedLayouts layout_descriptions={creativeLayoutDescription} layout_image_map={mostPopularCreativeLayouts} />
                    </PaginationProvider>
                    <UploadResumeCardAndIcon/>
                </ContainerWrapper>
                <StartBuildingResumeButtton />
   <LayoutsModal/>
            </Container>

        </>
    )
}
export default CreativeLayouts