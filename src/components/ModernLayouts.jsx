import React from "react";
import { templateDescription } from "../static-data/template_description";
import ClassicalLayout1 from "./layouts/classic/ClassicalLayout1";
import ClassicalLayout2 from "./layouts/classic/ClassicalLayout2";
import { H3, IconHolder, P } from "./elements/resumeSectionWrapper";
import TemplatesdescriptionCard from "./TemplateHeaderCard";
import { Hspace } from "./CustomComponents";
import { iconsColors } from "../static-data/icons-colors";
import { FaSearchPlus } from "react-icons/fa";
import TextIconButton from "./IconButton";
import { useTheme } from "styled-components";
import LayoutDescriptionCard from "./LayoutDescriptionCard";
import LayoutCard from "./LayoutCard";
import { layoutDescription } from "../static-data/layout_description";
const ModernLayouts = () => {
    const theme = useTheme()
    return (
        <>
            <Hspace></Hspace>
            <TemplatesdescriptionCard title={templateDescription.modern.title} description={templateDescription.modern.description}></TemplatesdescriptionCard>
            <div className="grid grid-cols-1  gap-4" id="modern">
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
                <TextIconButton icon={<FaSearchPlus color={`${theme.colors.icons.all_templates.color}`} />} text={"Explore More Layouts"} id={"modern"} />


            </div>

        </>
    )
}
export default ModernLayouts