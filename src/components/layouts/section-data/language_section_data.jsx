import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import generateTitle from "./titleGenerater"
import LanguageCard from "../cards/ResumeLanguageCard"
const generateLanguage = ({ languages, style, divider, layout_no, layout_type = layout_type_map.CLASSICAL, sectionHeader = "languages", props = {} }) => {
    let color;
    if (props.side === "right") {
        color = "white"
    }
    return {
        key: "language",
        content: () => (
            <>
                {

                    generateTitle({
                        title: sectionHeader,
                        style: {
                            ...style.sectionHeader,
                            ...(props.side === "right" && { color: "white" })
                        }
                    })

                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        languages.map((language, index) => (
                            <LanguageCard key={index} language={language} layout_no={layout_no} layout_type={layout_type}
                                style={style}
                                {...props}

                            />
                        ))
                    }
                </SectionContent>
            </>
        )
    }
}
export default generateLanguage