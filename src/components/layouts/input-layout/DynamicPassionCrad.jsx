import { useFieldArray, useFormContext } from "react-hook-form";
import { CardWrapper, Input } from "../../CustomComponents";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridTwo } from "./GridCards";
import { useLayout } from "../../../provider/layoutProvider";

const DynamicPassionCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    const { setMeasured } = useLayout()
    const handleAppend = () => {
        append({ value: "" });
        setMeasured(false)
    };
    const handleRemove = (index) => {
        remove(index)
        setMeasured(false)
    }

    return (
        <CardWrapper>
            {fields.length > 0 ? fields.map((field, index) => {
                const base = `${name}[${index}].passion`;
                return (
                    <GridTwo key={field.id}>
                        <Input
                            {...register(base)}
                            placeholder={`e.g. Tech Blogging, UI/UX Design`}
                        />
                        <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
                    </GridTwo>
                )
            }) :
                <AppendButton handleAppend={handleAppend} />
            }
        </CardWrapper>
    );
}
export default DynamicPassionCard