import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import generateTitle from "./titleGenerater"
import LanguageCard from "../cards/ResumeLanguageCard"
const generateLanguage = ({ languages, style, divider,sectionHeader="languages", props = {} }) => {
    const { grid } = props
    const Language = languages.map((language, index) => (
        <LanguageCard key={index} language={language} 
            style={style}
            {...props}

        />
    ))
    return {
        key: "language",
        content: () => (
            <>
                {

                    generateTitle({
                        title: sectionHeader,
                        style: {
                            ...style?.sectionHeader,
                            ...(props.side === "right" && { color: "white" })
                        }
                    })

                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        grid ? (
                            <div className="grid grid-cols-2 gap-3">
                                {Language}
                            </div>
                        )
                            :  Language 
                    }
                </SectionContent>
            </>
        )
    }
}
export default generateLanguage