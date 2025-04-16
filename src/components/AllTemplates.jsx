import React, { useEffect } from "react";
import { Hspace } from "./CustomComponents";
import { templateDescription } from "../sttaic-data/template_description";
import ClassicalLayout1 from "./layouts/classic/ClassicalLayout1";
import ClassicalLayout2 from "./layouts/classic/classicalLayout2";
import { H3, IconHolder, P } from "./elements/resumeSectionWrapper";
import TemplatesdescriptionCard from "./TemplateHeaderCard";
import { iconsColors } from "../sttaic-data/icons-colors";
import { FaSearchPlus } from "react-icons/fa";
import ClassicalLayout3 from "./layouts/classic/ClassicalLayout3";
import { useTheme } from "styled-components";
import TextIconButton from "./IconButton";
import LayoutCard from "./LayoutCard";
import LayoutDescriptionCard from "./LayoutDescriptionCard";
import { layoutDescription } from "../sttaic-data/layout_description";

const AllLayouts = () => {
    const theme = useTheme()
    return (
        <>
            <Hspace></Hspace>
            <TemplatesdescriptionCard title={templateDescription.all.title} description={templateDescription.all.description}></TemplatesdescriptionCard>
            <div className="grid grid-cols-1  gap-4 overflow-hidden" id="all-templates">
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
                <TextIconButton icon={<FaSearchPlus color={`${theme.colors.icons.all_templates.color}`} />} text={"Explore More Layouts"} id={"all_templates"} />
            </div>
        </>
    )
}
export default AllLayouts