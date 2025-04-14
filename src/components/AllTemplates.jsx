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

const AllLayouts = () => {
    return (
        <>
            <Hspace></Hspace>
            <TemplatesdescriptionCard title={templateDescription.all.title} description={templateDescription.all.description}></TemplatesdescriptionCard>
            <div className="grid grid-cols-1  gap-4 overflow-hidden" id="all-templates">
                <div className=" templates bg-green-50 hover:bg-green-100 hover:border-2 border-green-500 hover:ring transition-all duration-300 py-4  
                    hover:translate-y-3 hover:scale-105 cursor-pointer">
                    <ClassicalLayout3></ClassicalLayout3>
                    <div className="about-layout px-2 sm:px-12">
                        <H3 textAlign="left">Ivy League</H3>
                        <P>The Harvard template, updated for the 21st century, boasts a sleek design that is well-received by
                            recruiters and an improved structure for better performance in applicant tracking systems.</P>
                    </div>
                </div>
                <div className=" templates bg-green-50 hover:bg-green-100 hover:scale-105 cursor-pointer hover:border-2 border-green-500 hover:ring transition-all duration-300 py-4  hover:translate-y-3">
                    <ClassicalLayout2></ClassicalLayout2>
                    <div className="about-layout px-2 sm:px-12">
                        <H3 textAlign="left">Timeline</H3>
                        <P>The Timeline resume template is designed to showcase the progress of your career in an organized manner.
                            It's perfect for experienced professionals looking to make a lasting impression.
                        </P>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <button className={`flex ${iconsColors.all_templates.bg_class} hover:bg-green-200 
                                                    transition-all duration-300 items-center content-center`}>
                    <IconHolder backgroundColor={`${iconsColors.all_templates.icon_holder_bg}`} padding="10px" borderRadius="10px">

                        <FaSearchPlus color={`${iconsColors.all_templates.color}`}></FaSearchPlus>
                    </IconHolder>
                    <span className="text-md  text-black">Explore More Layouts</span>
                </button>

            </div>
        </>
    )
}
export default AllLayouts