import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import StrengthCard from "../cards/ResumeStrengthCard"
import generateTitle from "./titleGenerater"

const generateStrength = ({ strengths, style, divider, layout_no, layout_type = layout_type_map.CLASSICAL, sectionHeader = "strengths",props={} }) => {
    const { grid ,side} = props
    return {
        key: "strengths",
        content: () => (
            <>
                {
                    generateTitle({ title: sectionHeader, style: { ...style.sectionHeader ,...(side==="right") && {color:"white"}} })
                }
                {
                    divider ? divider : null
                }
                <SectionContent>

                    {
                        grid ? (
                            <div className="grid grid-cols-2 gap-5">
                                {
                                    strengths.map((strength, index) => (
                                        <StrengthCard
                                            key={index}
                                            layout_no={layout_no}
                                            layout_type={layout_type}
                                            style={style}
                                            strength={strength}
                                            {...props}
                                            />
                                    ))
                                }
                            </div>
                        ) :

                            strengths.map((strength, index) => (
                                <StrengthCard
                                    key={index}
                                    layout_no={layout_no}
                                    layout_type={layout_type}
                                    style={style}
                                    strength={strength}
                                    {...props}
                                    />
                            ))

                    }

                </SectionContent>
            </>
        )
    }

}
export default generateStrength