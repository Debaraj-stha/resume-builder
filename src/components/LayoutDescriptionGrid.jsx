import { FeatureGrid } from "./CustomComponents"
import InfoCard from "./InfoCard"

const LayoutCardGrid = ({cardInfos}) => {
    return <FeatureGrid margin="30px 0" minmax="300px">
        {
            cardInfos.map((info, index) => (
                <InfoCard key={index} title={info.title} content={info.content} {...info} />
            ))
        }
    </FeatureGrid>
}

export default LayoutCardGrid