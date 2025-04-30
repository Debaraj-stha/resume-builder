import { BiCalendar } from "react-icons/bi"
import { FlexBox } from "../../CustomComponents"

const AwardsCard = ({ awards, style, ...props }) => {
    return (
        <div>
            {
                awards.map((award, index) => (
                    <div key={index}>
                        <h2 style={{ ...style?.sectionSubHeader }}>{award.title}</h2>
                        <FlexBox margin="0" alignItems="center" justifyContent="space-between">
                            <p style={{ ...style?.p }}>{award.organization}</p>
                            <FlexBox margin="0" alignItems="center">
                                <BiCalendar />
                                <p style={{ ...style?.p }}>{award.year}</p>
                            </FlexBox>
                        </FlexBox>
                    </div>
                ))
            }
        </div>
    )
}

export default AwardsCard