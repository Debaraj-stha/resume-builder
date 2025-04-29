import { memo } from "react"



const generateSimpleAchievementCard = ({ my_acheivement, layout_no, style,props }) => {
    const { acheivement, field, date } = my_acheivement
    const { shouldApplyGrid ,side} = props
 
    let color;
    if (side === "right") {
        color = "white"
    }
    if (shouldApplyGrid) {
        return (
            <>
                <div className="grid grid-cols-2">
                    <div>
                        <h2 style={{ ...style.h2,...(props.side==="right") && {color:"white"}}}>{acheivement}</h2>
                        <p style={{ ...style.p }}>{field}</p>
                    </div>

                </div>
            </>
        )
    }
    return (
        <>
            <div className="my-3">
                <h2 style={{ ...style.h2, ...(props.side==="right") && {color:"white"}}}>{acheivement}</h2>
                <p style={{ ...style.p,color:`${color}` }}>{field}</p>
                <p style={{ ...style.p,color:`${color}` }}>{date}</p>
            </div>
        </>
    )
}

const AcheivementCard = memo(({ my_acheivement, layout_no, style, layout_type = "classical", ...props }) => {



    return generateSimpleAchievementCard({ my_acheivement, layout_no, style,props })


})

export default AcheivementCard