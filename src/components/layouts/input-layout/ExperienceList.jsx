import React from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import { Textarea } from "../../elements/resumeSectionWrapper";
import { useLayout } from "../../../provider/layoutProvider";
import { Button, CardWrapper, Input } from "../../CustomComponents";
import { GridTwo } from "./GridCards";
import AppendRemoveButton, { AppendButton, RemoveButton } from "./AppendDeleteButton";
const ExperienceList = ({ name }) => {
  const { control, register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const {measured, setMeasured } = useLayout()
  const handleRemove = (index)=>{
    remove(index);
    setMeasured(false)
  }
  const handleAppend = () => {
    append({ value: "" })
    setMeasured(false)
    console.log("measuredsssss",measured)

  }

  return (
    <CardWrapper>
      {
        fields.length> 0?
      fields.map((field, index) => (
        <GridTwo key={field.id} style={{ position: "relative" }}>
          <Textarea
            placeholder="Responsibility or Accomplishment #1"
            rows={2}
            {...register(`${name}[${index}].value`)}
          />
         <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove}/>
        </GridTwo>
      )):
      <AppendButton handleAppend={handleAppend} />
    }
      

     
    </CardWrapper>
  );
};

export default ExperienceList;
