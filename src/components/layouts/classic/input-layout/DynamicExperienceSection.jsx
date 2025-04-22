import React from "react";
import styled from "styled-components";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import ExperienceList from "./ExperienceList";
import { Button, Input } from "../../../CustomComponents";
import { Textarea } from "../../../elements/resumeSectionWrapper";
import { useLayout } from "../../../../provider/layoutProvider";


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

  return (
    <div>
      {fields.map((field, outerIndex) => {
        const base = `experiences[${outerIndex}]`; // Path to individual experience
        return (
          <FieldGroup key={field.id} data-id={`experience-${outerIndex}`} className="experience">
            <Input placeholder="Company Name" {...register(`${base}.companyName`)} />
            <Input placeholder="Job Title / Position" {...register(`${base}.position`)} />
            <Textarea placeholder="About Company/Role" rows={2} {...register(`${base}.aboutCompany`)} />
            <Input placeholder="Companu Address" {...register(`${base}.location`)} />
            <Input placeholder="Job Start Date" {...register(`${base}.startDate`)} />
            <Input placeholder="Job End Date" {...register(`${base}.endDate`)} />
            <ExperienceList name={`${base}.achievements`} />
           
            {/* Pass the dynamic path to ExperienceList */}

            <Button
              type="button"
              variant="danger"
              margin="10px 0"
              onClick={() => {
                remove(outerIndex)
                setMeasured(false)
              }}
              display="flex"

            >
              <FiDelete /> Remove Experience Section
            </Button>
          </FieldGroup>
        );
      })}


      <Button
        type="button"
        variant="primary"
        onClick={() => {
          append({ companyName: "", position: "", aboutCompany: "", achievements: [{ value: "" }] })
          console.log("Experience added")
          setMeasured(false)
        }}

      >
        + Add Another Experience
      </Button>
    </div>
  );
};

export default DynamicExperienceSection;
