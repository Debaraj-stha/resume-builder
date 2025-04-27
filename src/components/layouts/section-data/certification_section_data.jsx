import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import CertificationCard from "../cards/ResumeCertificationCard"
import generateTitle from "./titleGenerater"

const generateCertification = ({ certificates, divider, layout_no, layout_type = layout_type_map.CLASSICAL, sectionHeader = "certification" }) => {
    return {
        key: "certification",
        content: () => (
            <>
                {

                    generateTitle({ title:  sectionHeader , style: { ...style.sectionHeader, textAlign: "left" } })
                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        certificates.map((certificate, index) => (
                            <CertificationCard key={index} certificate={certificate} layout_no={layout_no} layout_type={layout_type}
                                style={{ h2: style.h2, color: style.headerTextColor }}
                            />
                        ))
                    }
                </SectionContent>
            </>
        )
    }
}
export default generateCertification