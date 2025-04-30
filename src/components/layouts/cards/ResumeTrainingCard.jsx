import { BiCalendar } from "react-icons/bi"
import { FlexBox } from "../../CustomComponents"

const TrainingCard = ({ trainings, style, ...props }) => {
    return (
        <div>
            {
                trainings.map((training, index) => (
                    <div key={index}>
                        <h2 style={{ ...style?.sectionSubHeader }}>{training.title}</h2>
                        <FlexBox margin="0" alignItems="center" justifyContent="space-between">
                            <p style={{ ...style?.p }}>{training.organization}</p>
                            <FlexBox margin="0" alignItems="center">
                                <BiCalendar />
                                <p style={{ ...style?.p }}>{training.year}</p>
                            </FlexBox>
                        </FlexBox>
                    </div>
                ))
            }
        </div>
    )
}

export default TrainingCard