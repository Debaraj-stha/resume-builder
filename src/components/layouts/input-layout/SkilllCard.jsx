import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, CardWrapper, Input } from "../../CustomComponents";
import { CgAdd } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";
import AppendRemoveButton, { AppendButton, RemoveButton } from "./AppendDeleteButton";
import { GridFour, GridTwo } from "./GridCards";
import { useLayout } from "../../../provider/layoutProvider";

const DynamicSkillCard = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name, // 'skills'
  });
  const {measured,setMeasured}=useLayout()
  const handleAppend = () => {
    append({ field: "", items: [""] })
    setMeasured(false)
  }
  const handleRemove = (index) => {
    remove(index)
    setMeasured(false)
  }

  return (
    <div className="space-y-6">

      {
        fields.length > 0 ?
          fields.map((field, index) => (
            <CardWrapper key={field.id} className="p-4 rounded-lg space-y-2">
              <GridTwo>
                <Input
                  placeholder="Field (e.g. Frontend, Backend, Database)"
                  {...register(`${name}[${index}].field`)}
                />
                <AppendRemoveButton handleRemove={handleRemove} handleAppend={handleAppend} toolTipText={{
                  appendField: "Append New Skill Section",
                  removeField: "Remove Skill Section"
                }} />
              </GridTwo>
              <SkillItems name={`${name}[${index}].items`} />
            </CardWrapper>
          )) : <AppendButton handleAppend={handleAppend} toolTipText="Append New Skill Section" />
      }


    </div>
  );
};

const SkillItems = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name, // items inside skills[i]
  });
  const {setMeasured}=useLayout()
  const handleAppend = () => {
    append({ value: "" })
     setMeasured(false)
    
  }
  const handleRemove = (index) => {
    remove(index)
     setMeasured(false)
  }

  return (
    <GridTwo>
      {
        fields.length > 0 ?
          fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 my-2">
              <Input
                placeholder={`Skill #${index + 1}`}
                {...register(`${name}[${index}].value`)}
              />
              <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
            </div>
          )) : <AppendButton handleAppend={handleAppend} />
      }

    </GridTwo>
  );
};

export default DynamicSkillCard;
export { SkillItems }
