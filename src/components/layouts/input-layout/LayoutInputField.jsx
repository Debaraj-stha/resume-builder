import React, { useEffect, useRef, useState } from "react";
import { LayoutWrapperWithBorder, ResumeInputFieldWrapper, ResumeWrapper } from "../../elements/resumeWrapper";
import { Section } from "../../elements/resumeSectionWrapper";
import { useParams } from "react-router-dom";
import { fetchSectionData } from "./section-data/fetch-section-data";
import { useLayout } from "../../../provider/layoutProvider";
import { useFormContext } from "react-hook-form";
import { H1 } from "../../CustomComponents";




const LayoutInputField = () => {
  const params = useParams()
  const layout_id = parseInt(params.layout_id, 10); //  force it to be a number bydefault it is string
  const layout_type=params.layout_type||"classical"


  const sectionData = fetchSectionData({layout_id,layout_type})
  const [pages, setPages] = useState([]);
  const { measured, setMeasured, groupSectionsIntoPages, sectionRefs } = useLayout()

  const { handleSubmit } = useFormContext()
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
   <div className="min-h-screen overflow-y-scroll">
     <form onSubmit={handleSubmit(onSubmit)}>
      <LayoutWrapperWithBorder>
        <div className="my-6">
          <H1>Input Your Details</H1>
        </div>
        <ResumeInputFieldWrapper>
          {sectionData.map((section, i) => {
            const isExperienceSection = section.key === "experience-0";
            return (
              <Section key={section.key} ref={(el) => (sectionRefs.current[i] = el)} data-id={section.key} data-section={isExperienceSection ? "experience" : section.key}>
                {section.content()}
              </Section>
            )
          }
          )}

        </ResumeInputFieldWrapper>

      </LayoutWrapperWithBorder>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button type="submit">Save Resume</button>
      </div>
    </form>

   </div>
  );
};

export default LayoutInputField;
