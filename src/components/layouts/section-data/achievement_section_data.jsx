import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import AcheivementCard from "../cards/ResumeAchievementCard"
import generateTitle from "./titleGenerater"

const generateAchievement = ({
    achievements,
    style,
    divider,
    layout_no,
    layout_type = layout_type_map.CLASSICAL,
    titleHeader = "achievement",
    props = {} }) => {

    return {
        key: "achievements",
        content: () => (
            <>
                {

                    generateTitle({
                        title: titleHeader,
                        style: {
                            ...style.sectionHeader,
                            ...(props.side === "right" && { color: "white" })
                        }
                    })

                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        achievements.map((achievement, index) => (
                            <AcheivementCard
                                key={index}
                                my_acheivement={achievement} layout_no={layout_no}
                                style={
                                    style
                                }
                                layout_type={layout_type}
                                {...props}

                            />

                        ))
                    }

                </SectionContent>
            </>
        )
    }
}

export default generateAchievement