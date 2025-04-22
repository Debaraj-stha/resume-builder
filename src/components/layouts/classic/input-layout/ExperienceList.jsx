import React from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import { Textarea } from "../../../elements/resumeSectionWrapper";
import { useLayout } from "../../../../provider/layoutProvider";
import { Button, Input } from "../../../CustomComponents";
const ExperienceList = ({ name }) => {
  const{control,register}=useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
const{setMeasured}=useLayout()
  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: "1rem", position: "relative" }}>
          <Textarea
            placeholder="Responsibility or Accomplishment #1"
            rows={2}
            {...register(`${name}[${index}].value`)}
          />
          <Button
            type="button"
            onClick={() =>{
              remove(index);
              setMeasured(false)
            }}
            style={{ position: "absolute", right: 0 }}
          >
            <FiDelete />
          </Button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>{ append({ value: "" })
        setMeasured(false)
        }}
        style={{
          padding: "0.4rem 1rem",
          borderRadius: "5px",
          background: "#eee",
          border: "none",
          cursor: "pointer",
        }}
      >
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceList;
