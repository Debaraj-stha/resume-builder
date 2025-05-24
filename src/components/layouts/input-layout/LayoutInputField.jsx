import { useMemo } from "react";
import { LayoutWrapperWithBorder, ResumeInputFieldWrapper } from "../../elements/resumeWrapper";
import { Section } from "../../elements/resumeSectionWrapper";
import { useParams } from "react-router-dom";
import { fetchSectionData } from "./section-data/fetch-section-data";
import { useFormContext } from "react-hook-form";
import {H3 } from "../../CustomComponents";

import { layout_type_map } from "../../../constant";

const LayoutInputField = () => {
  const params = useParams()
  const layout_id = parseInt(params.layout_id, 10);
  const layout_type = params.layout_type

const generatedProps = useMemo(() => {
    const props = {};
    const handleModernLayoutProps = () => {
      switch (layout_id) {
        case 2:
          props.header = {
            acceptImage: true
          }
          break
        case 5:
          props.header = {
            acceptImage: true
          }
          break
      }
      return props
    }
    const handleCreativeLayoutProps = () => {
      switch(layout_id){
        case 5:
          props.header={
             acceptImage: true
          }
      }
      return props
    }
    const handleClassicLayoutProps = () => {
      props.header={acceptImage:false}
      return props
    }
    const handleSimpleLayoutProps = () => {
      switch(layout_id){
        case 1:
          props.header={
            acceptImage:true
          }
      }
      return props
    }

    switch (layout_type) {
      case layout_type_map.MODERN:
        return handleModernLayoutProps()
      case layout_type_map.CLASSICAL:
        return handleClassicLayoutProps()
      case layout_type_map.CREATIVE:
        return handleCreativeLayoutProps()
      case layout_type_map.SIMPLE:
        return handleSimpleLayoutProps()
      default:
        break;
    }

    return props;
  }, [layout_type, layout_id]);

  const sectionData = fetchSectionData({ layout_id, layout_type, props: generatedProps })
  const { handleSubmit } = useFormContext()
  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <div className="min-h-screen overflow-y-scroll">
      <form onSubmit={handleSubmit(onSubmit)}>
        <LayoutWrapperWithBorder padding="20px 20mm">
           <H3>Input Your Details</H3>
  
          <ResumeInputFieldWrapper>
            {sectionData.map((section, i) => {
              const isExperienceSection = section.key === "experience-0";
              console.log("section key",section.key,i)
              return (
                <Section key={section.key} data-section={isExperienceSection ? "experience" : section.key}>
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
