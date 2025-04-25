import { memo } from "react"
import { H2, H3, P } from "../../elements/resumeSectionWrapper"
//styles
import style from "../classic/style/layout1_style.json"
import style2 from "../classic/style/layout2_style.json"
import style3 from "../classic/style/layout3_style.json"
import { layout_type_map } from "../../../constant"


const buildClassicalCertificationCard = ({ certificate, layout_no }) => {
    switch (layout_no) {

        case 5:
            return (
                <div>
                    <div style={{ flex: "2" }}>
                        <H2 textAlign="left" fontSize="15px">{certificate.certificate}</H2>
                    </div>
                    <div style={{ flex: "7" }}>

                        <P fontWeight="500">{certificate.subject}</P>
                        <P fontWeight="400" fontSize="14px">{certificate.date}</P>
                    </div>
                </div>
            )

        default:

            return (
                <div>
                    <div style={{ flex: "2" }}>
                        <H3 textAlign="left" fontWeight="500">{certificate.certificate}</H3>
                    </div>
                    <div style={{ flex: "7" }}>

                        <P fontWeight="500">{certificate.subject}</P>
                        <P fontWeight="400" fontSize="14px">{certificate.date}</P>
                    </div>
                </div>
            )
    }
}

const buildModernCertificateCard = ({ certificate, layout_no, style }) => {
            return (
                <div>
                    <div style={{ flex: "2" }}>
                        <h3 style={{ ...style.h3 }}>{certificate.certificate}</h3>
                    </div>
                    <div style={{ flex: "7" }}>

                        <P style={{ ...style.p }}>{certificate.subject}</P>
                        <P style={{ ...style.p }}>{certificate.date}</P>
                    </div>
                </div>
            )
        
}

const CertificationCard = memo(({ certificate, layout_no, layout_type = "classical",style }) => {
    if (layout_type === layout_type_map.CLASSICAL) {
        return buildClassicalCertificationCard({ certificate, layout_no })
    }
    if (layout_type === layout_type_map.MODERN) {
        return buildModernCertificateCard({ certificate, layout_no ,style})
    }


})
export default CertificationCard