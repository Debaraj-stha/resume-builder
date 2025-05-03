import { useFieldArray, useFormContext } from "react-hook-form";
import { CardWrapper, Input } from "../../CustomComponents";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridThree } from "./GridCards";


const DynamicIndustryExpertiseCard = ({ name }) => {

    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const handleAppend = () => {
        append({ tech: "", value: "" })
    };
    const handleRemove = (index) => {
        remove(index)
    }
 

    return (
        <CardWrapper>
            {
                fields.length > 0 ? fields.map((field, index) => {
                    const base = `${name}[${index}]`
                    return (
                        <GridThree key={field.id}>
                            <Input {...register(`${base}.tech`)} placeholder={`${base}.tech e.g(Photoshop,Java)`} />
                            <Input {...register(`${base}.value`)} placeholder={`${base}.value e.g(60,70)`} />
                            <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
                        </GridThree>
                    )

                }) : <AppendButton handleAppend={handleAppend} />
            }

        </CardWrapper>
    )
}
export default DynamicIndustryExpertiseCard