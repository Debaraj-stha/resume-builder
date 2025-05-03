import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton from "./AppendDeleteButton";
import { GridThree } from "./GridCards";
import { CardWrapper, Input } from "../../CustomComponents";
import { Textarea } from "../../../components/elements/resumeSectionWrapper"

const DynamicStrengthsCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const handleAppend = () => {
        append({ title: "", description: "" });
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
                       <div className="my-4">
                         <GridThree>
                            <Input placeholder={`${base}.title e.g(Problem Solving)`} {...register(`${base}.title`)} />
                            <Textarea
                                placeholder={`${base}.description e.g(Able to analyze complex problems, break them down into smaller tasks, and devise efficient solutions under tight deadlines)`}
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