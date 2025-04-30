import { SectionContent } from "../../elements/resumeSectionWrapper"
import AwardsCard from "../cards/ResumeAwardsCard"
import generateTitle from "./titleGenerater"

const generateAwardsSectionData = ({ awards, style, divider, titleHeader="awards", props={} })=>{
return{
    key:"awards",
    content:()=>(
        <>
        { generateTitle({title:titleHeader,style:{...style.sectionHeader}})}
        {divider?divider:null}
        <SectionContent>
            <AwardsCard awards={awards} style={style} {...props}/>
        </SectionContent>
        </>
    )
}
}

export default generateAwardsSectionData