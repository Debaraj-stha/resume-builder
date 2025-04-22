import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Input } from "../../../CustomComponents";
import { FiDelete } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";
import { useLayout } from "../../../../provider/layoutProvider";

const DynamicEducationCard = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { setMeasured } = useLayout()
  // educations: [{ university: "", degree: "", start_complete: "" }],
  return (
    <div>
      {fields.length > 0 ? (
        fields.map((field, index) => {
          const base = `${name}[${index}]`;

          return (
            <div key={field.id} className="mb-6">
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

              <div className="flex justify-start gap-5 mt-2">
                <Button
                  type="button"
                  onClick={() => {
                    append({
                      university: "",
                      degree: "",
                      start_complete: "",
                    })
                    setMeasured(false)
                  }
                  }
                >
                  <CgAdd />
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => { remove(index); setMeasured(false) }}
                >
                  <FiDelete />
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <Button
            type="button"
            onClick={() => {
              append({ university: "", degree: "", start_complete: "" })
              setMeasured(false)
            }
            }
          >
            <CgAdd />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DynamicEducationCard;
