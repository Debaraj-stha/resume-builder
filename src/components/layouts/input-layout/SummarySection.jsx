import { useFormContext } from "react-hook-form";
import { Textarea } from "../../elements/resumeSectionWrapper";

const SummarySection = () => {
  const { register } = useFormContext();
  return (
    <Textarea placeholder="Summary" rows="7" {...register("summary")} />
  );
};

export default SummarySection;
