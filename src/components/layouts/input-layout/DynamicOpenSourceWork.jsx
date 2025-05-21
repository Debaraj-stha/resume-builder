import { useFieldArray, useFormContext } from "react-hook-form";
import AppendRemoveButton, { AppendButton } from "./AppendDeleteButton";
import {  GridFour,  GridThree,  GridTwo } from "./GridCards";
import { CardWrapper, H2, Input } from "../../CustomComponents";
import { Textarea } from "../../elements/resumeSectionWrapper";
import { useLayout } from "../../../provider/layoutProvider";


const DynamicTechnologyCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const handleAppend = () => {
        append({ value: "" })
    };
    const handleRemove = (index) => {
        remove(index)
    }
    return (
        <CardWrapper>
            <div className="flex flex-wrap gap-6">
                {
                    fields.length > 0 ? fields.map((field, index) => {
                        const base = `${name}[${index}]`
                        return (
                            <div key={field.id} className="flex items-center gap-2 w-fit">

                                <Input placeholder="React" {...register(`${base}.value`)} />
                                <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove} />
                            </div>
                        )

                    }) : <AppendButton handleAppend={handleAppend} />
                }
            </div>
        </CardWrapper>
    )
}

const DynamicOpenSourceWorkCard = ({ name }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    const{setMeasured}=useLayout()
    const handleAppend = () => {
        append({
            tech: "",
            value: "",
            projectName: "",
            role: "",
            link: "",
            date: "",
            description: "",
            technologies: [{ value: "" }]
        })
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
                        <CardWrapper key={field.id} className="">
                            <GridTwo>
                                <Input placeholder="Project Name" {...register(`${base}.project_name`)} />
                                <Input placeholder="Role (e.g. Contributor)" {...register(`${base}.role`)} />
                                <Input placeholder="Link to PR or Repo" {...register(`${base}.link`)} />
                                <Input type="date" {...register(`${base}.date`)} />
                            </GridTwo>
                            <H2 className="text-left">Techonogies used</H2>
                            <CardWrapper>
                                {/* <GridFive> */}
                                    <DynamicTechnologyCard name={`${base}.technologies`} />
                                {/* </GridFive> */}
                            </CardWrapper>
                            <GridTwo>
                                <Textarea {...register(`${base}.description`)}
                                    placeholder="Describe your contribution and impact" />
                                <AppendRemoveButton handleAppend={handleAppend} handleRemove={handleRemove}
                                    toolTipText={{ appendField: "Append New Section", removeField: "Remove This Section" }}
                                />
                            </GridTwo>



                        </CardWrapper>
                    )
                }) : <AppendButton handleAppend={handleAppend} toolTipText={{ appendField: "Append New Section" }} />
            }
        </CardWrapper>
    )

}
export default DynamicOpenSourceWorkCard