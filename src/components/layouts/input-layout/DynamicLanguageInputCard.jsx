import { useFieldArray, useFormContext } from "react-hook-form";
import { CardWrapper, Input } from "../../CustomComponents";

import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridThree } from "./GridCards";


const DynamicLanguageInputCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const handleAdd = () => {
        append({ language: "", proficiency: "" });
    };
    const handleRemove = (index) => {
        remove(index)
    }


    return (
        <CardWrapper >
            {fields.length > 0 ? (
                fields.map((field, index) => {
                    const base = `${name}[${index}]`;
                    return (
                        <GridThree key={field.id}>
                            <Input
                                name={`${base}.language`}
                                {...register(`${base}.language`)}
                                placeholder="Language"
                            />
                            <Input
                                name={`${base}.proficiency`}
                                {...register(`${base}.proficiency`)}
                                placeholder="Proficiency e.g. native, intermediate"
                            />
                            <AppendRemoveButton handleAppend={handleAdd} handleRemove={handleRemove} />
                        </GridThree>
                    );
                })
            ) : <AppendButton handleAppend={handleAdd} />
            }
        </CardWrapper>
    );
};

export default DynamicLanguageInputCard;
