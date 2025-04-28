import { memo } from "react"



const generateSimpleAchievementCard = ({ my_acheivement, layout_no, style, shouldApplyGrid }) => {
    const { acheivement, field, date } = my_acheivement
    if (shouldApplyGrid)
        return (
            <>
                <div className="grid grid-cols-2">
                    <div>
                        <h2 style={{ ...style.h2, textAlign: "left" }}>{acheivement}</h2>
                        <p style={{ ...style.p }}>{field}</p>
                    </div>

                </div>
            </>
        )
    return (
        <>
            <div>
                <h2 style={{ ...style.h2, textAlign: "left" }}>{acheivement}</h2>
                <p style={{ ...style.p }}>{field}</p>
                <p style={{ ...style.p }}>{date}</p>
            </div>
        </>
    )
}

const AcheivementCard = memo(({ my_acheivement, layout_no, style, layout_type = "classical", ...props }) => {
    const { shouldApplyGrid } = props

    return generateSimpleAchievementCard({ my_acheivement, layout_no, style, shouldApplyGrid })
    

})

export default AcheivementCard