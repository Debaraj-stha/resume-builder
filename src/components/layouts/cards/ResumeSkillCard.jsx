import { memo } from "react";
import { BorderBox, ColumnFlexBox, FlexBox, GridBox } from "../../CustomComponents";

const buildSimpleSkillCard = ({ skills, layout_no, style, ...props }) => {
    console.log("props", props)
    const { shouldIncludeField, borderBox, borderBottom } = props
    const skillWithBorderBottom = (item, key) => (
        <BorderBox key={key} borderBottomColor="#555">
            <h3 style={{ ...style.h3, margin: "0", padding: "0" }}>{item}</h3>
        </BorderBox>
    )
    const borders = {
        borderBottomColor: "#555",
        borderLeftColor: "#555",
        borderTopColor: "#555",
        borderRightColor: "#555"

    }
    const skillWithBorder = (item, key) => (
        <BorderBox key={key} {...borders} padding="5px">
            <h3 style={{ ...style.h3, margin: "0", padding: "0" }}>{item}</h3>
        </BorderBox>
    )
    return (
        <>

            <ColumnFlexBox {...(!shouldIncludeField ? { flexDirection: "row", gap: "0" ,flexWrap:"wrap"} : {})}>
                {
                    skills.map((skill, index) => (
                        <FlexBox key={index} flexWrap="wrap" margin="0" alignItems="center">
                            {shouldIncludeField && (
                                <h3 style={{ ...style?.sectionSubHeader, margin: "0", padding: "0" }}>
                                    {skill.field} :
                                </h3>
                            )}
                            {skill.items.map((item, i) => {
                                if (borderBottom) {
                                    return skillWithBorderBottom(item, `${index}-${i}`)
                                }
                                if (borderBox) {
                                    return skillWithBorder(item, `${index}-${i}`)
                                }
                                return (
                                    <h3 style={{ ...style.h3, margin: "0", padding: "0" }} key={`${index}-${i}`}>
                                        {item}
                                    </h3>
                                )
                            })}
                        </FlexBox>
                    ))
                }
            </ColumnFlexBox>
        </>


    )
}

const SkillCard = memo(({ skills, layout_no, layout_type, style, ...props }) => {    // if (layout_type === layout_type_map.CLASSICAL) {



    return buildSimpleSkillCard({ skills, layout_no, style, ...props })


})
export default SkillCard