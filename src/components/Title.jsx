import { memo } from "react";
import { H1 } from "./elements/resumeSectionWrapper";

export const Title = memo(({ title,fontSize,fontWeight,className,fontFamily ,textAlign,color="black"}) => (
  <H1 fontSize={fontSize} fontWeight={fontWeight} className={className} fontFamily={fontFamily} textAlign={textAlign} color={color}>
    {title}
  </H1>
));
