import ResumeMyTimeCard from "../cards/ResumeMyTimeCrad"
import generateTitle from "./titleGenerater"
const generateMyTimeSection=({items,style,divider,sectionHeader="my Time"})=>{
    return {
        key:"my_time",
        content:()=>(
            <>
            {generateTitle({title:sectionHeader,style:style.sectionHeader})}
            {
                divider ?divider :null
            }
            <ResumeMyTimeCard items={items} style={style}/>
            </>
        )
    }
}

export default generateMyTimeSection