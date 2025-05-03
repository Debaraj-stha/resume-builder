import { useFieldArray, useFormContext } from "react-hook-form";
import { CardWrapper, Input } from "../../CustomComponents"
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridThree } from "./GridCards";

const DynamicMyTimeCard=({name})=>{
        const { control, register } = useFormContext();
        const { fields, append, remove } = useFieldArray({ control, name });
    
        const handleAppend = () => {
            append({ field: "", value: "" });
        };
        const handleRemove = (index) => {
            remove(index)
        }
    
    return(
        <CardWrapper>
            {
                fields.length>0 ? fields.map((field,index)=>{
                    const base=`${name}[${index}]`
                    return(
                        <GridThree>
                            <Input {...register(`${base}.activity`)} placeholder="Learning new things,Time in nature"/>
                            <Input {...register(`${base}.value`)} placeholder="how much portion of  time you spent  on this activity on a day e.g 1,2"/>
                            <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove}/>
                        </GridThree>
                    )

                }):<AppendButton handleAppend={handleAppend}/>
            }

        </CardWrapper>
    )
}
export default DynamicMyTimeCard