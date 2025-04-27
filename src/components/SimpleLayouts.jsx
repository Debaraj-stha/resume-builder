import React from "react";
import { templateDescription } from "../static-data/template_description";
import ClassicalLayout1 from "../components/layouts/classic/layout-1/layout"
import ClassicalLayout2 from "../components/layouts/classic/layout-2/layout"
import { H3, IconHolder, P } from "./elements/resumeSectionWrapper";
import TemplatesdescriptionCard from "./TemplateHeaderCard";
import { Hspace } from "./CustomComponents";
import { iconsColors } from "../static-data/icons-colors";
import { FaSearchPlus } from "react-icons/fa";
import { useTheme } from "styled-components";
import TextIconButton from "./IconButton";
import LayoutCard from "./LayoutCard";
import LayoutDescriptionCard from "./LayoutDescriptionCard";
import { layoutDescription } from "../static-data/layout_description";
const SimpleLayouts = () => {
    const theme = useTheme()
    return (
        <>
            <Hspace></Hspace>
            <TemplatesdescriptionCard title={templateDescription.simple.title} description={templateDescription.simple.description}></TemplatesdescriptionCard>
            <div className="grid grid-cols-1  overflow-hidden gap-4" id="simple">
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
                <TextIconButton icon={<FaSearchPlus color={`${theme.colors.icons.all_templates.color}`} />} text={"Explore More Layouts"} id={"simple"} />

            </div>
        </>
    )
}
export default SimpleLayouts