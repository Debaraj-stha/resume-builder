
import { features } from "../sttaic-data/feature-data"
import { FeatureCard, FeatureGrid, Features, Heading, } from "./CustomComponents"

const FeatureCards = () => {
  return (
    <Features>
      <Heading>Why Choose Resume Builder?</Heading>
      <FeatureGrid>
        {
          features.map((feature, index) => (
            <FeatureCard key={index}>
              <h3>{feature.heading}</h3>
              <p>{feature.content}</p>
            </FeatureCard>
          ))
        }
      </FeatureGrid>
    </Features>
  )
}
export default FeatureCards