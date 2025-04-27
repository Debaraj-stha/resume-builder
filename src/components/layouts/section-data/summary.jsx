import { SectionContent } from "../../elements/resumeSectionWrapper"
import generateTitle from "./titleGenerater"

const generateSummary = ({summary,style,divider,titleHeader="summary"}) => {
    return    {
            key: "summary",
            content: () => (
                <>
                    {

                        generateTitle({ title: titleHeader, style: { ...style.sectionHeader, } })
                    }
                   {
                    divider? divider  : null
                   }
                    <SectionContent>
                        <p style={{ ...style.p }}>{summary}</p>
                    </SectionContent>
                </>
            )
        }
    
}

export default generateSummary