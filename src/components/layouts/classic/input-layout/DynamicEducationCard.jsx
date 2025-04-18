import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button, Input } from "../../../CustomComponents"
import { FiDelete } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";

const DynamicEducationCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div>
            {
                fields.length > 0 ? (
                    fields.map((field, index) => {
                        const base = `educations[${index}]`
                        // education: [{ university: "", degree: "", start_complete: "" }],
                        return (
                            <div key={field.id}>

                                <Input placeholder="University Name" {...register(`${base}.university`)} />
                                <Input placeholder="Degree (e.g., B.Sc. in Computer Science)" {...register(`${base}.degree`)} />
                                <Input placeholder="Start & Completion Dates (e.g., 2020 - 2024)" rows={2} {...register(`${base}.start_complete`)} />

                                <div className="flex justify-start gap-5">
                                    <Button onClick={() => append({ name: "" })}><CgAdd /></Button>
                                    <Button variant="danger" onClick={() => remove(field.id)}><FiDelete /></Button>
                                </div>
                            </div>
                        )
                    })
                ) :
                    (
                        <div>

                            <Button onClick={() => append({ name: "" })}><CgAdd /></Button>
                        </div>
                    )
            }
        </div >
    )
}
export default DynamicEducationCard