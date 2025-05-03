import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { Input } from "../../CustomComponents";

const DynamicAwardCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const handleAppend = () => {
        append({ title: "", organization: "", year: "", location: "" });
    };
    const handleRemove = (index) => {
        remove(index)
    }
    // title: "Top Rated Freelancer",
    // organization: "Upwork Corporation",
    // year: "2018"
    return (
        <>
            {
                fields.length > 0 ? fields.map((field, index) => {
                    const base = `${name}[${index}]`
                    return (
                        <div key={field.id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-5">
                            <Input placeholder={`${base}.title e.g(Top Rated Freelancer)`} {...register(`${base}.title`)} />
                            <Input placeholder={`${base}.organization e.g(Upwork Corporation)`} {...register(`${base}.organization`)} />
                            <Input placeholder={`${base}.year`} {...register(`${base}.year`)} type="date" />
                            <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
                        </div>
                    )
                }) : <AppendButton />
            }
        </>

    )
}
export default DynamicAwardCard