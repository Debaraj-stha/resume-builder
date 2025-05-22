import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { CardWrapper, Input } from "../../CustomComponents";
import { GridTwo } from "./GridCards";
import { useLayout } from "../../../provider/layoutProvider";

const DynamicTrainingCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    const { setMeasured } = useLayout();

    const handleAppend = () => {
        append({ title: "", organization: "", year: "", location: "" });
        setMeasured(false);
    };

    const handleRemove = (index) => {
        remove(index);
        setMeasured(false);
    };

    return (
        <CardWrapper>
            {fields.length > 0 ? (
                fields.map((field, index) => {
                    const base = `${name}[${index}]`;
                    return (
                        <div className="my-4" key={field.id}>
                            <GridTwo>
                                <Input
                                    {...register(`${base}.title`)}
                                    placeholder="Training Title (e.g. MBA Study Seminar)"
                                />
                                <Input
                                    {...register(`${base}.organization`)}
                                    placeholder="Organization (e.g. University of New York)"
                                />
                                <Input
                                    {...register(`${base}.year`)}
                                    placeholder="Year Completed"
                                    type="date"
                                />
                                <Input
                                    {...register(`${base}.location`)}
                                    placeholder="Location (e.g. New York)"
                                />
                                <AppendRemoveButton
                                    handleAppend={handleAppend}
                                    handleRemove={() => handleRemove(index)}
                                />
                            </GridTwo>
                        </div>
                    );
                })
            ) : (
                <AppendButton handleAppend={handleAppend} />
            )}
        </CardWrapper>
    );
};

export default DynamicTrainingCard;
