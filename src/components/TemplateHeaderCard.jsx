import  { memo } from "react";
import { H1,P } from "./elements/resumeSectionWrapper";
import { useTheme } from "styled-components";
const TemplatesdescriptionCard=memo(({title,description})=>{
    const theme=useTheme()//use usetheme hook from styled components
    return(
        <div>
        <H1 color={theme.colors.text} fontWeight="700">{title}</H1>
        <P color={theme.colors.text} className="my-5" fontSize="18px">
            {description}
        </P>
    </div>
    )
})
export default TemplatesdescriptionCard