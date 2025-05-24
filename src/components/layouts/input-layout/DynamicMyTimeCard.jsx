import { useFieldArray, useFormContext } from "react-hook-form";
import { CardWrapper, Input } from "../../CustomComponents"
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridThree } from "./GridCards";
import { useLayout } from "../../../provider/layoutProvider";

const DynamicMyTimeCard=({name})=>{
        const { control, register } = useFormContext();
        const { fields, append, remove } = useFieldArray({ control, name });
    const{setMeasured}=useLayout()
        const handleAppend = () => {
            append({ field: "", value: "" });
             setMeasured(false)
        };
        const handleRemove = (index) => {
            remove(index)
             setMeasured(false)
        }
    
    return(
        <CardWrapper>
            {
                fields.length>0 ? fields.map((field,index)=>{
                    const base=`${name}[${index}]`
                    return(
                        <GridThree key={field.id}>
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