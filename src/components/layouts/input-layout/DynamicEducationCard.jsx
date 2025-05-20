import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {  CardWrapper, Input } from "../../CustomComponents";

import { useLayout } from "../../../provider/layoutProvider";
import { GridThree, GridTwo } from "./GridCards";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";

const DynamicEducationCard = ({ name,...props}) => {
  const{acceptGPA=false,acceptAddress=false}=props
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
      start_year: "",
      end_year:"",
      address:"",
      gpa:""
    })
    setMeasured(false)
  }
  const handleRemove=(index) => { remove(index); setMeasured(false) }

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
                placeholder="Start date (e.g., 2020 - 2024)"
                {...register(`${base}.start_year`)}
              />
              <Input
                placeholder="End date (e.g., 2020 - 2024)"
                {...register(`${base}.end_year`)}
              />
              {
                acceptGPA &&  <Input
                placeholder="GPA e.g 3.02"
                {...register(`${base}.gpa`)}
              />
              
              }
              {
                acceptAddress &&
                <Input
                placeholder="Address of university"
                {...register(`${base}.address`)}
              />
              }
              
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
