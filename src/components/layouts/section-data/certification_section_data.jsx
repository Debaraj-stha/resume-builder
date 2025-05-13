import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import CertificationCard from "../cards/ResumeCertificationCard"
import generateTitle from "./titleGenerater"

const generateCertification = ({ certificates, divider, style, sectionHeader = "certification", props = {} }) => {
    const { grid } = props
    const Certificate = certificates.map((certificate, index) => (
        <CertificationCard key={index}
            certificate={certificate}
            {...props}
            style={style}
        />
    ))
    const{side}=props
    const color=side=="right" && {color :"white" }
    console.log("certif",side)
    return {
        key: "certification",
        content: () => (
            <>
                {

                    generateTitle({ title: sectionHeader, style: { ...style?.sectionHeader, ...(props.side === "right" && { color: "white" }), textAlign: "left", } })
                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        grid ? (
                            <div className="grid grid-cols-2 gap-3">
                                {
                                    Certificate
                                }
                            </div>
                        )

                            : Certificate 
                    }

                </SectionContent>
            </>
        )
    }
}
export default generateCertification