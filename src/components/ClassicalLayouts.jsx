import React from "react";
import { templateDescription } from "../static-data/template_description";
import ClassicalLayout1 from "./layouts/classic/ClassicalLayout1";
import ClassicalLayout2 from "./layouts/classic/ClassicalLayout2";
import { H3, IconHolder, P } from "./elements/resumeSectionWrapper";
import TemplatesdescriptionCard from "./TemplateHeaderCard";
import { Hspace } from "./CustomComponents";
import { FaBinoculars, FaSearchPlus } from "react-icons/fa";
import { iconsColors } from "../static-data/icons-colors";
import TextIconButton from "./IconButton";
import { useTheme } from "styled-components";
import LayoutCard from "./LayoutCard";
import LayoutDescriptionCard from "./LayoutDescriptionCard";
import { layoutDescription } from "../static-data/layout_description";
const ClassicalLayouts = () => {
    const theme = useTheme()
    return (
        <>
            <Hspace></Hspace>
            <TemplatesdescriptionCard title={templateDescription.classical.title} description={templateDescription.classical.description}></TemplatesdescriptionCard>
            <div className="grid grid-cols-1 overflow-hidden  gap-4" id="classical">
            <LayoutCard>
                    <ClassicalLayout1 />
                    <LayoutDescriptionCard title={Object.keys(layoutDescription[0])} descriptionm={layoutDescription[0]["Ivy League"]} />

                </LayoutCard>
                <LayoutCard>
                    <ClassicalLayout2 />
                    <LayoutDescriptionCard title={Object.keys(layoutDescription[1])} descriptionm={layoutDescription[1]["Timeline"]} />
                </LayoutCard>
            </div>
            <div className="py-2">
                <TextIconButton icon={<FaSearchPlus color={`${theme.colors.icons.all_templates.color}`} />} text={"Explore More Layouts"} id={"classical"} />

            </div>
        </>
    )
}
export default ClassicalLayouts