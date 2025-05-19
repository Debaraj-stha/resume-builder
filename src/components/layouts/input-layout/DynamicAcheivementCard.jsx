import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button, CardWrapper, Input } from "../../CustomComponents"
import { FiDelete } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";
import { useLayout } from "../../../provider/layoutProvider";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridThree } from "./GridCards";

const DynamicAcheivementCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const { measured, setMeasured } = useLayout()
    const handleAppend = () => {
        console.log(fields.length, "before");
        append({ achievement: "", field: "", date: "" });
        console.log(fields.length, "after");

        setMeasured(false)
    }
    const handleRemove = (index) => { remove(index); setMeasured(false) }

    return (
        <CardWrapper>
            {
                // achievements: [{ achievement: "", field: "", date: "" }],
                fields.length > 0 ? (
                    fields.map((field, index) => {
                        const base = `achievements[${index}]`
                        return (
                            <CardWrapper key={field.id}>
                                <GridThree>
                                    <Input placeholder="Achievement Title" {...register(`${base}.achievement`)} />
                                    <Input placeholder="Field of Achievement (e.g., AI, Design)" {...register(`${base}.field`)} />
                                    <Input placeholder="Date of Achievement" {...register(`${base}.date`)} />
                                </GridThree>
                                <AppendRemoveButton
                                    handleAppend={handleAppend}
                                    handleRemove={handleRemove}
                                />
                            </CardWrapper>

                        )
                    })
                ) :
                    <AppendButton handleAppend={handleAppend} />
            }
        </CardWrapper>
    )
}
export default DynamicAcheivementCard