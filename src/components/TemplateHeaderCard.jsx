import React from "react";
import { H1,P } from "./elements/resumeSectionWrapper";
const TemplatesdescriptionCard=({title,description})=>{
    return(
        <div>
        <H1 color="white" fontWeight="700">{title}</H1>
        <P color="white" className="my-5" fontSize="18px">
            {description}
        </P>
    </div>
    )
}
export default TemplatesdescriptionCard