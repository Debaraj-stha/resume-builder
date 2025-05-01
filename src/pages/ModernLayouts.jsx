import React, { useEffect } from "react";
import { templateDescription } from "../static-data/template_description";
import TemplatesdescriptionCard from "../components/TemplateHeaderCard";
import { CTAButton, Hspace } from "../components/CustomComponents";
import { modern_layouts_image_map, mostPopularModernLayouts } from "../components/LayoutImages";
import LayoutCardWithDetails from "../components/LayoutCardWithDetails";
import { classicalLayoutDescription, modernLayoutDescription } from "../static-data/layout_description";
import ContainerWrapper from "../components/layouts/wrappers/ContainerWrapper";
import LayoutGridWrapper from "../components/layouts/wrappers/LayoutGridWrapper";
import Container from "../components/Container";
import { PaginationProvider, usePagination } from "../provider/paginationProvider";
import { classicalLayoutCardInfos } from "../static-data/classicalLayoutDescription"

import LayoutCardGrid from "../components/LayoutDescriptionGrid";
import MostUsedLayouts from "../components/MostUsedLayouts";
import { modernLayoutCardInfos } from "../static-data/modern_layout_card_info";
import StartBuildingResumeButtton from "../components/StartBuildingResumeButton";
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
                    <LayoutGridWrapper>
                        {
                            Object.entries(modern_layouts_image_map).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(([layoutName, imageSRC], index) => (
                                <LayoutCardWithDetails
                                    key={index}
                                    imageSRC={imageSRC}
                                    layoutName={layoutName}
                                    layoutDescription={classicalLayoutDescription[layoutName]}
                                />
                            ))
                        }
                    </LayoutGridWrapper>
                    {/* paginations buttons */}
                    {PaginationButtons}
                    {/* info card sections */}
                    <LayoutCardGrid cardInfos={modernLayoutCardInfos} />
                    <PaginationProvider>
                        <MostUsedLayouts layout_descriptions={modernLayoutDescription} layout_image_map={mostPopularModernLayouts} />
                    </PaginationProvider>
                </ContainerWrapper>
                <StartBuildingResumeButtton />

            </Container>

        </>
    )
}
export default ModernLayouts