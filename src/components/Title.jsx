import { H1 } from "./elements/resumeSectionWrapper";

export const Title = ({ title,fontSize,fontWeight,className }) => (
  <H1 fontSize={fontSize} fontWeight={fontWeight} className={className}>
    {title}
  </H1>
);
