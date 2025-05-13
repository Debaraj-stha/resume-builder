import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton from "./AppendDeleteButton";
import { GridThree } from "./GridCards";
import { CardWrapper, Input } from "../../CustomComponents";
import { Textarea } from "../../../components/elements/resumeSectionWrapper"
import { useLayout } from "../../../provider/layoutProvider";

const DynamicStrengthsCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
const {setMeasured}=useLayout()
    const handleAppend = () => {
        append({ title: "", description: "" });
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
                       <div key={field.id} className="my-4">
                         <GridThree>
                            <Input placeholder="e.g Problem Solving " {...register(`${base}.title`)} />
                            <Textarea
                                placeholder="Description about strength"
                                {...register(`${base}.description`)} />
                            <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
                        </GridThree>
                       </div>
                    )

                }) : <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
            }
        </CardWrapper>
    )
}
export default DynamicStrengthsCard