import React, { useEffect } from "react";
import { Hspace } from "./CustomComponents";
import { templateDescription } from "../static-data/template_description";
import ClassicalLayout1 from "./layouts/classic/ClassicalLayout1";
import ClassicalLayout2 from "./layouts/classic/ClassicalLayout2";
import { H3, IconHolder, P } from "./elements/resumeSectionWrapper";
import TemplatesdescriptionCard from "./TemplateHeaderCard";
import { iconsColors } from "../static-data/icons-colors";
import { FaSearchPlus } from "react-icons/fa";
import ClassicalLayout3 from "./layouts/classic/ClassicalLayout3";
import { useTheme } from "styled-components";
import TextIconButton from "./IconButton";
import LayoutCard from "./LayoutCard";
import LayoutDescriptionCard from "./LayoutDescriptionCard";
import { layoutDescription } from "../static-data/layout_description";
import { achievements, educations, experiences, personalDetails, skills, summary,certificates } from "../static-data/resume-sample-data";
import ClassicalLayout4 from "./layouts/classic/ClassicalLayout4";

const AllLayouts = () => {
    const data = {
        personalDetails, educations, summary, experiences, achievements,skills,certificates
    }
    const theme = useTheme()
    return (
        <>
            <Hspace></Hspace>
            <TemplatesdescriptionCard title={templateDescription.all.title} description={templateDescription.all.description}></TemplatesdescriptionCard>
            <div className="grid grid-cols-1  gap-4 overflow-hidden" id="all-templates">
                <LayoutCard>
                    <ClassicalLayout1 {...data} />
                    <LayoutDescriptionCard title={Object.keys(layoutDescription[0])} descriptionm={layoutDescription[0]["Ivy League"]} />
                </LayoutCard>
                <LayoutCard>
                    <ClassicalLayout2  {...data} />
                    <LayoutDescriptionCard title={Object.keys(layoutDescription[1])} descriptionm={layoutDescription[1]["Timeline"]} />
                </LayoutCard>
                <LayoutCard>
                    <ClassicalLayout3  {...data} />
                    <LayoutDescriptionCard title={Object.keys(layoutDescription[1])} descriptionm={layoutDescription[1]["Timeline"]} />
                </LayoutCard>
                 <LayoutCard>
                    <ClassicalLayout4  {...data} />
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