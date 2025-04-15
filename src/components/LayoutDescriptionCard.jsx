import React from "react";
import { H3,P } from "./elements/resumeSectionWrapper";
const LayoutDescriptionCard=({title,descriptionm})=>{
    return(
        <div className="about-layout px-2 sm:px-12">
            <H3 textAlign="left">{title}</H3>
            <P>{descriptionm}</P>
        </div>
    )
}
export default LayoutDescriptionCard