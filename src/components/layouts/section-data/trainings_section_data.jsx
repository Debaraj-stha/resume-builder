import { SectionContent } from "../../elements/resumeSectionWrapper"
import TrainingCard from "../cards/ResumeTrainingCard"
import generateTitle from "./titleGenerater"

const generateTrainingsectionData = ({ trainings, style, divider, titleHeader="trainings/cources", props={} })=>{
return{
    key:"trainings",
    content:()=>(
        <>
        { generateTitle({title:titleHeader,style:{...style.sectionHeader}})}
        {divider?divider:null}
        <SectionContent>
            <TrainingCard trainings={trainings} style={style} {...props}/>
        </SectionContent>
        </>
    )
}
}

export default generateTrainingsectionData