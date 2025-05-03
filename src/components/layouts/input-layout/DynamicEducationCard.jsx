import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {  CardWrapper, Input } from "../../CustomComponents";

import { useLayout } from "../../../provider/layoutProvider";
import { GridThree, GridTwo } from "./GridCards";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";

const DynamicEducationCard = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { setMeasured } = useLayout()
  const handleAppend=() => {
    append({
      university: "",
      degree: "",
      start_complete: "",
    })
    setMeasured(false)
  }
  const handleRemove=() => { remove(index); setMeasured(false) }
  // educations: [{ university: "", degree: "", start_complete: "" }],
  return (
    <CardWrapper>
      {fields.length > 0 ? (
        fields.map((field, index) => {
          const base = `${name}[${index}]`;

          return (
            <CardWrapper key={field.id}>
              <GridThree>
              <Input
                placeholder="University Name"
                {...register(`${base}.university`)}
              />
              <Input
                placeholder="Degree (e.g., B.Sc. in Computer Science)"
                {...register(`${base}.degree`)}
              />
              <Input
                placeholder="Start & Completion Dates (e.g., 2020 - 2024)"
                {...register(`${base}.start_complete`)}
              />
              </GridThree>

              <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove}/>
            </CardWrapper>
          );
        })
      ) : (
        <AppendButton handleAppend={handleAppend}/>
      )}
    </CardWrapper>
  );
};

export default DynamicEducationCard;
