import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import AcheivementCard from "../cards/ResumeAchievementCard"
import generateTitle from "./titleGenerater"

const generateAchievement = ({
    achievements,
    style,
    divider,

    titleHeader = "achievement",
    props = {} }) => {
    const { shouldApplyGrid,side } = props
    const Achievement = achievements?.map((achievement, index) => (
        <AcheivementCard
            key={index}
            my_acheivement={achievement} 
            style={
                style
            }
            {...props}

        />

    ))
    const textColor=side==="right" ? {color:"white"} : {}
    return {
        key: "achievements",
        content: () => (
            <>
                {

                    generateTitle({
                        title: titleHeader,
                        style: {
                            ...style.sectionHeader,
                            ...textColor
                        }
                    })

                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        shouldApplyGrid ? (
                            <div className="grid grid-cols-2 gap-3">
                                {Achievement}
                            </div>

                        ) :
                            Achievement 

                    }

                </SectionContent>
            </>
        )
    }
}

export default generateAchievement