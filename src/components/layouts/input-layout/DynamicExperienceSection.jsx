import React from "react";
import styled from "styled-components";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import ExperienceList from "./ExperienceList";
import { Button, CardWrapper, Input } from "../../CustomComponents";
import { Textarea } from "../../elements/resumeSectionWrapper";
import { useLayout } from "../../../provider/layoutProvider";
import AppendRemoveButton, { AppendButton, RemoveButton } from "./AppendDeleteButton";
import { GridTwo } from "./GridCards";


const FieldGroup = styled.div`
  padding: 1rem;
  // border: 1px solid #ddd;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  // background-color: #fafafa;
`;

const DynamicExperienceSection = ({ name }) => {

  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { measured, setMeasured } = useLayout()
  const handleAppend = () => {
    console.log("before measured",measured)
    append({
          company_name: "",
          position: "",
          about_company: "",
          start_date: "",
          end_date: "",
          location: "",
          achievements: [{ value: "" }]

        })
    console.log("Experience added")
    setMeasured(false)
    console.log("after measured",measured)
  }
  const handleRemove = (outerIndex) => {
    remove(outerIndex)
    setMeasured(false)
  }

  return (
    <CardWrapper>
      {fields.length> 0?
      fields.map((field, outerIndex) => {
        const base = `experiences[${outerIndex}]`; // Path to inCardWrapperidual experience
        return (
          <FieldGroup key={field.id} data-id={`experience-${outerIndex}`} className="experience">
            <GridTwo>
              <Input placeholder="Company Name" {...register(`${base}.company_name`)} />
              <Input placeholder="Job Title / Position" {...register(`${base}.position`)} />
              <Textarea placeholder="About Company/Role" rows={2} {...register(`${base}.about_company`)} />
              <Input placeholder="Companu Address" {...register(`${base}.location`)} />
              <Input placeholder="Job Start Date" {...register(`${base}.start_date`)} />
              <Input placeholder="Job End Date" {...register(`${base}.end_date`)} />
            </GridTwo>
            <ExperienceList name={`${base}.achievements`} />

            {/* Pass the dynamic path to ExperienceList */}

            <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove}/>
          </FieldGroup>
        );
      }):  <AppendButton handleAppend={handleAppend} />
    }


     
    </CardWrapper>
  );
};

export default DynamicExperienceSection;
