import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Input } from "../../../CustomComponents";
import { CgAdd } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";

const DynamicSkillCard = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name, // This refers to the `skills` field in the form state
  });

  return (
    <div className="space-y-4">
      <p className="font-semibold text-lg">Skills</p>
      {fields.length > 0 ? (
        fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <Input
              placeholder={`Skill #${index + 1}`}
              {...register(`${name}[${index}]`)}
            />
            <Button variant="danger" onClick={() => remove(index)}>
              <FiDelete />
            </Button>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No skills added yet.</p>
      )}
      <Button
        type="button" 
        onClick={() => append("")}
      >
        <CgAdd className="mr-1" />
      </Button>
    </div>
  );
};

export default DynamicSkillCard;
