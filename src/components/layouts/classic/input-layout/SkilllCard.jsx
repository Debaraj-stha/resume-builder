import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Input } from "../../../CustomComponents";
import { CgAdd } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";

const DynamicSkillCard = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name, // 'skills'
  });

  return (
    <div className="space-y-6">
      <p className="font-semibold text-lg">Skills</p>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Field (e.g. Frontend, Backend, Database)"
              {...register(`${name}[${index}].field`)}
            />
            <Button variant="danger" onClick={() => remove(index)}>
              <FiDelete />
            </Button>
          </div>

          <SkillItems name={`${name}[${index}].items`} />
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ field: "", items: [""] })}
      >
        <CgAdd className="mr-1" />
        Add Field
      </Button>
    </div>
  );
};

const SkillItems = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name, // items inside skills[i]
  });

  return (
    <div className="space-y-2">
      {fields.map((item, i) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            placeholder={`Skill #${i + 1}`}
            {...register(`${name}[${i}]`)}
          />
          <Button variant="danger" onClick={() => remove(i)}>
            <FiDelete />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append("")}>
        <CgAdd className="mr-1" />
        Add Skill
      </Button>
    </div>
  );
};

export default DynamicSkillCard;
export {SkillItems}
