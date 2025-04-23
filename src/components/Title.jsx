import { H1 } from "./elements/resumeSectionWrapper";

export const Title = ({ title,fontSize,fontWeight,className,fontFamily ,textAlign}) => (
  <H1 fontSize={fontSize} fontWeight={fontWeight} className={className} fontFamily={fontFamily} textAlign={textAlign}>
    {title}
  </H1>
);
