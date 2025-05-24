import React, { useEffect } from "react";
import { templateDescription } from "../static-data/template_description";
import TemplatesdescriptionCard from "../components/TemplateHeaderCard";
import {  Hspace } from "../components/CustomComponents";
import {mostPopularSimpleLayouts, simple_layout_image_map } from "../components/LayoutImages";
import {  simpleLayoutDescription } from "../static-data/layout_description";
import ContainerWrapper from "../components/layouts/wrappers/ContainerWrapper";
import Container from "../components/Container";
import { PaginationProvider, usePagination } from "../provider/paginationProvider";

import LayoutCardGrid from "../components/LayoutDescriptionGrid";
import MostUsedLayouts from "../components/MostUsedLayouts";
import StartBuildingResumeButtton from "../components/StartBuildingResumeButton";
import RenderLayoutImage from "../components/RenderLayoutImage";
import { simpleLayoutCardInfos } from "../static-data/simple_layout_card_infos";
import { layout_type_map } from "../constant";
import UploadResumeCardAndIcon from "../components/UploadResumeCardAndIcon";
import LayoutsModal from "../components/LayoutsModal";
const SimpleLayouts = () => {
    const itemsPerPage = 3
    const { currentPage, PaginationButtons, setItemsLength } = usePagination()
    useEffect(() => {
        const length = Object.keys(simple_layout_image_map).length
        //setting items length to calculate pages
        setItemsLength(length)
    }, [])

    const handleButtonClick=()=>{

    }
    return (

        <>
            <Container>
                <Hspace height="200px" />
                <ContainerWrapper>
                    <TemplatesdescriptionCard 
                    title={templateDescription.simple.title}
                     description={templateDescription.simple.description}></TemplatesdescriptionCard>

                    {/* layout images */}
                    <RenderLayoutImage
                        layoutDescription={simpleLayoutDescription}
                        layouts={simple_layout_image_map}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        layout_type={layout_type_map.SIMPLE}
                    />
                    {PaginationButtons}
                    {/* info card sections */}
                    <LayoutCardGrid cardInfos={simpleLayoutCardInfos} />
                    <PaginationProvider>
                        <MostUsedLayouts layout_descriptions={simpleLayoutDescription} layout_image_map={mostPopularSimpleLayouts} />
                    </PaginationProvider>
                </ContainerWrapper>
                <UploadResumeCardAndIcon/>
                <StartBuildingResumeButtton onClick={handleButtonClick}/>
   <LayoutsModal/>
            </Container>

        </>
    )
}
export default SimpleLayouts