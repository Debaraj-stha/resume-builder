import React, { memo } from "react"
import { CTA, CTAButton, Heading } from "./CustomComponents"
const CTACard=memo(({onClick})=>{
    return (
          <CTA>
                <Heading>Ready to Build Your Resume?</Heading>
                <p>Create a resume that gets noticed in just minutes.</p>
                <CTAButton onClick={onClick}>Get Started Now</CTAButton>
              </CTA>
    )
})
export default  CTACard