
import { BorderBox, FlexBox } from "../../CustomComponents"



const generateSimpleOpenSourceCard = ({ works,  style }) => {

    return (
        <>
            {
                works.map((work, index) => {
                    const {project_name:projectName, role, description, link, technologies, date } = work
                    return (
                        <div key={index}>
                            <h2 style={{ ...style.h2 }}>{projectName}</h2>
                            <FlexBox margin="0" justifyContent="space-between">
                                <p style={{ ...style.p }}>{link}</p>
                                <p style={{ ...style.p }}>{date}</p>
                            </FlexBox>
                            <p style={{ ...style.p }}>{description}</p>
                            <FlexBox margin="0" justifyContent="start">
                                {
                                    technologies.map((tech, index) => <BorderBox key={index}  margin="0"  color={style.p.color} padding="5px 0"><p>{tech.value}</p></BorderBox>)
                                }
                            </FlexBox>
                        </div>
                    )
                })
            }

        </>
    )
}
const OpenSourceWorkCard = ({ works,  style }) => {


        return generateSimpleOpenSourceCard({ works,  style })
    

}
export default OpenSourceWorkCard