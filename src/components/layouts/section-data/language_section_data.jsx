import { layout_type_map } from "../../../constant"
import generateTitle from "./titleGenerater"

const generateLanguage = ({ languages, style, divider, layout_no, layout_type = layout_type_map.CLASSICAL, sectionHeader = "lamguages" }) => {
    return {
        key: "language",
        content: () => (
            <>
                {

                    generateTitle({ title:  sectionHeader , style: { ...style.sectionHeader } })
                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        languages.map((language, index) => (
                            <LanguageCard key={index} language={language} layout_no={layout_no} layout_type={layout_type}
                                style={{ h2: style.h2, color: style.headerTextColor }}
                            />
                        ))
                    }
                </SectionContent>
            </>
        )
    }
}
export default generateLanguage