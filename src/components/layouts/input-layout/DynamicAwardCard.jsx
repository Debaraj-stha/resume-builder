import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { Input } from "../../CustomComponents";
import { useLayout } from "../../../provider/layoutProvider";
import { GridTwo } from "./GridCards";

const DynamicAwardCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    const { setMeasured } = useLayout();

    const handleAppend = () => {
        append({ title: "", organization: "", year: "" });
        setMeasured(false);
    };

    const handleRemove = (index) => {
        remove(index);
        setMeasured(false);
    };

    return (
        <>
            {fields.length > 0 ? (
                fields.map((field, index) => {
                    const base = `${name}[${index}]`;
                    return (
                        <GridTwo key={field.id} className="my-4">
                            <Input
                                placeholder="Award Title (e.g. Top Rated Freelancer)"
                                {...register(`${base}.title`)}
                            />
                            <Input
                                placeholder="Issuing Organization (e.g. Upwork Corporation)"
                                {...register(`${base}.organization`)}
                            />
                            <Input
                                placeholder="Year Awarded"
                                {...register(`${base}.year`)}
                                type="date"
                            />
                            <AppendRemoveButton
                                handleAppend={handleAppend}
                                handleRemove={() => handleRemove(index)}
                            />
                        </GridTwo>
                    );
                })
            ) : (
                <AppendButton onClick={handleAppend} />
            )}
        </>
    );
};

export default DynamicAwardCard;
