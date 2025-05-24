import { memo } from "react"
import { FaTrophy } from "react-icons/fa"



const generateSimpleAchievementCard = ({ my_acheivement,  style, props }) => {
    const { achievement, field, date } = my_acheivement

    const { shouldApplyGrid, side, shouldIncludeIcon } = props

    const Achievement = (
        <div>
            <h2 style={{ ...style.h2, ...(props.side === "right") && { color: "white" } }}>{achievement}</h2>
            <p style={{ ...style.p, ...(props.side === "right") && { color: "white" } }}>{field}</p>
            <p style={{ ...style.p, ...(props.side === "right") && { color: "white" } }}>{date}</p>
        </div>
    )
    return (
        <>
            <div className={`${shouldIncludeIcon ? "flex gap-5  justify-start content-center":""}`}>
                {
                    shouldIncludeIcon && (
                        <div className="pt-3">
                            <FaTrophy color={side==="right" ? "white" :style.iconColor } />
                        </div>
                    )
                }
                <div>
                    {Achievement}
                </div>
            </div>
        </>
    )
}

const AcheivementCard = memo(({ my_acheivement,  style,  ...props }) => {

    return generateSimpleAchievementCard({ my_acheivement,  style, props })

})

export default AcheivementCard