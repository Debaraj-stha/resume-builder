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
            variant="danger"
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

      <Button
        type="button"
   
        margin="10px 0"
        onClick={() =>{ append({ value: "" })
        setMeasured(false)
        }}
       
      >
        + Add Experience
      </Button>
    </div>
  );
};

export default ExperienceList;
