import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridFour, GridOne, GridThree, GridTwo } from "./GridCards";
import { CardWrapper, Input } from "../../CustomComponents";
import { useTheme } from "styled-components";
import { useLayout } from "../../../provider/layoutProvider";

const DynamicCertificateCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    const { setMeasured } = useLayout();

    const handleAppend = () => {
        append({ subject: "", certificate: "", date: "" });
        setMeasured(false);
    };

    const handleRemove = (index) => {
        remove(index);
        setMeasured(false);
    };

    const theme = useTheme();

    return (
        <CardWrapper>
            {fields.length > 0 ? (
                fields.map((field, index) => {
                    const base = `${name}[${index}]`;
                    return (
                        <div className="my-4" key={field.id}>
                            <GridOne>
                                <Input
                                    {...register(`${base}.subject`)}
                                    placeholder="Subject e.g. Frontend Development"
                                />
                                <Input
                                    {...register(`${base}.certificate`)}
                                    placeholder="Certificate Name e.g. React & JavaScript Mastery"
                                />
                                <Input
                                    {...register(`${base}.date`)}
                                    type="date"
                                    placeholder="Date Awarded"
                                />
                                <AppendRemoveButton
                                    handleAppend={handleAppend}
                                    handleRemove={() => handleRemove(index)}
                                />
                            </GridOne>
                        </div>
                    );
                })
            ) : (
                <AppendButton handleAppend={handleAppend} />
            )}
        </CardWrapper>
    );
};

export default DynamicCertificateCard;
