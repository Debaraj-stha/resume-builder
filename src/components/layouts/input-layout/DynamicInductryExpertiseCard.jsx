import { useFieldArray, useFormContext } from "react-hook-form";
import { CardWrapper, Input } from "../../CustomComponents";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridThree } from "./GridCards";
import { useLayout } from "../../../provider/layoutProvider";


const DynamicIndustryExpertiseCard = ({ name }) => {

    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
const{setMeasured}=useLayout()
    const handleAppend = () => {
        append({ tech: "", value: "" })
        setMeasured(false)
    };
    const handleRemove = (index) => {
        remove(index)
        setMeasured(false)
    }
 

    return (
        <CardWrapper>
            {
                fields.length > 0 ? fields.map((field, index) => {
                    const base = `${name}[${index}]`
                    return (
                        <GridThree key={field.id}>
                            <Input {...register(`${base}.tech`)} placeholder={`tech e.g Photoshop,Java`} />
                            <Input {...register(`${base}.value`)} placeholder={`value e.g 60,70`} />
                            <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
                        </GridThree>
                    )

                }) : <AppendButton handleAppend={handleAppend} />
            }

        </CardWrapper>
    )
}
export default DynamicIndustryExpertiseCard