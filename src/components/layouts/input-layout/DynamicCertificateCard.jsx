import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import { GridFour } from "./GridCards";
import { CardWrapper, Input } from "../../CustomComponents";
import { useTheme } from "styled-components";

const DynamicCertificateCard = ({ name }) => {

    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const handleAppend = () => {
        append({ subject: "", certificate: "", date: "" })
    };
    const handleRemove = (index) => {
        remove(index)
    }
    const theme = useTheme()
    return (
        <CardWrapper>
            {
                fields.length > 0 ? fields.map((field, index) => {
                    const base = `${name}[${index}]`
                    return (
                        <div className="my-4">
                            <GridFour>
                                <Input {...register(`${base}.subject`)}
                                    placeholder={`${base}.subject e.g(Frontend Developer Certificate)`} />
                                <Input {...register(`${base}.certificate`)}
                                    placeholder={`${base}.subject e.g(React And Javascript)`} />
                                <Input {...register(`${base}.date`)}
                                    type="date"
                                />
                                <AppendRemoveButton
                                    handleAppend={handleAppend}
                                    handleRemove={handleRemove}
                                />
                            </GridFour>
                        </div>
                    )
                }) : <AppendButton handleAppend={handleAppend} />
            }
        </CardWrapper>
    )
}
export default DynamicCertificateCard