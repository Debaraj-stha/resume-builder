import React from "react";
import styled from "styled-components";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import ExperienceList from "./ExperienceList";
import { Button, Input } from "../../../CustomComponents";
import { Textarea } from "../../../elements/resumeSectionWrapper";


const FieldGroup = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  background-color: #fafafa;
`;

const DynamicExperienceSection = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name,
    });
  
    return (
      <div>
        {fields.map((field, outerIndex) => {
          const base = `experiences[${outerIndex}]`; // Path to individual experience
          return (
            <FieldGroup key={field.id}>
              <Input placeholder="Company Name" {...register(`${base}.companyName`)} />
              <Input placeholder="Job Title / Position" {...register(`${base}.position`)} />
              <Textarea placeholder="About Company/Role" rows={2} {...register(`${base}.aboutCompany`)} />
  
              <ExperienceList name={`${base}.acheivements`} />  
              {/* Pass the dynamic path to ExperienceList */}
  
              <button
                type="button"
                onClick={() => remove(outerIndex)}
                style={{
                  background: "#ffdddd",
                  padding: "0.4rem 1rem",
                  border: "none",
                  borderRadius: "6px",
                  marginTop: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <FiDelete /> Remove Experience Section
              </button>
            </FieldGroup>
          );
        })}
  
        <Button
          onClick={() => append({ companyName: "", position: "", aboutCompany: "", experience: [{ value: "" }] })}
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            background: "#d0f0d0",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add Another Experience
        </Button>
      </div>
    );
  };
  
export default DynamicExperienceSection;
