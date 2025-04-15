import React from "react";
import { templateDescription } from "../sttaic-data/template_description";
import ClassicalLayout1 from "./layouts/classic/ClassicalLayout1";
import ClassicalLayout2 from "./layouts/classic/classicalLayout2";
import { H3, IconHolder, P } from "./elements/resumeSectionWrapper";
import TemplatesdescriptionCard from "./TemplateHeaderCard";
import { Hspace } from "./CustomComponents";
import { iconsColors } from "../sttaic-data/icons-colors";
import { FaSearchPlus } from "react-icons/fa";
import { useTheme } from "styled-components";
import TextIconButton from "./IconButton";
import LayoutCard from "./LayoutCard";
import LayoutDescriptionCard from "./LayoutDescriptionCard";
const SimpleLayouts = () => {
    const theme = useTheme()
    return (
        <>
            <Hspace></Hspace>
            <TemplatesdescriptionCard title={templateDescription.simple.title} description={templateDescription.simple.description}></TemplatesdescriptionCard>
            <div className="grid grid-cols-1  overflow-hidden gap-4" id="simple">
                <LayoutCard>
                    <ClassicalLayout1 />
                    <LayoutDescriptionCard title={"Ivy League"} descriptionm={`The Harvard template, updated for the 21st century, boasts a sleek design that is well-received by
                            recruiters and an improved structure for better performance in applicant tracking systems.`} />

                </LayoutCard>
                <LayoutCard>
                    <ClassicalLayout2 />
                    <LayoutDescriptionCard title={"Ivy League"} descriptionm={`The Timeline resume template is designed to showcase the progress of your career in an organized manner.
                            It's perfect for experienced professionals looking to make a lasting impression.`} />

                </LayoutCard>
            </div>
            <div className="py-2">
                <TextIconButton icon={<FaSearchPlus color={`${theme.colors.icons.all_templates.color}`} />} text={"Explore More Layouts"} id={"simple"} />

            </div>
        </>
    )
}
export default SimpleLayouts