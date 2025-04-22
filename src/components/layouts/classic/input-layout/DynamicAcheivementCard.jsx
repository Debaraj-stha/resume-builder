import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button, Input } from "../../../CustomComponents"
import { FiDelete } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";
import { useLayout } from "../../../../provider/layoutProvider";

const DynamicAcheivementCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const { measured, setMeasured } = useLayout()
    return (
        <div>
            {
                // achievements: [{ acheivement: "", field: "", date: "" }],
                fields.length > 0 ? (
                    fields.map((field, index) => {
                        const base = `achievements[${index}]`
                        return (
                            <div key={field.id}>
                                <Input placeholder="Achievement Title" {...register(`${base}.acheivement`)} />
                                <Input placeholder="Field of Achievement (e.g., AI, Design)" {...register(`${base}.field`)} />
                                <Input placeholder="Date of Achievement" {...register(`${base}.date`)} />
                                <div className="flex justify-start gap-5">
                                    <Button onClick={() => { append({ name: "" }); setMeasured(false) }}><CgAdd /></Button>
                                    <Button variant="danger" onClick={() => { remove(field.id); setMeasured(false) }}><FiDelete /></Button>
                                </div>
                            </div>
                        )
                    })
                ) :
                    (
                        <div>

                            <Button onClick={() => { append({ name: "" }); setMeasured(false) }}><CgAdd /></Button>
                        </div>
                    )
            }
        </div >
    )
}
export default DynamicAcheivementCard