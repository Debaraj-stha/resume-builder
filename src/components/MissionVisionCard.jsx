import { Heading, Text, TwoColumn } from "./CustomComponents"
import React from "react"

const MissionVisionCard=()=>{
    return (
        <>
          <TwoColumn>
                <div>
                    <Heading>Our Mission</Heading>
                    <Text>
                        To empower every job seeker to present their skills and achievements in the best possible light.
                    </Text>
                </div>
                <div>
                    <Heading>Our Vision</Heading>
                    <Text>
                        A world where every professional has access to tools that help them stand out—regardless of background or experience level.
                    </Text>
                </div>
            </TwoColumn>
        </>
    )
}
export default MissionVisionCard